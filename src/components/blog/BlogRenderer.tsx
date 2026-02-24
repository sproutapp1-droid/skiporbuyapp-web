"use client";

import { useMemo } from "react";
import StatBlock from "./StatBlock";
import KeyTakeaway from "./KeyTakeaway";
import BlogCTA from "./BlogCTA";
import CostPerUseCalculator from "./CostPerUseCalculator";
import ProgressChecklist from "./ProgressChecklist";
import type { Dictionary } from "@/i18n/getDictionary";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface BlogRendererProps {
  content: string;
  dict: Dictionary;
}

export default function BlogRenderer({ content, dict }: BlogRendererProps) {
  const elements = useMemo(() => parseContent(content), [content]);

  return (
    <div data-blog-content className="blog-prose">
      {elements.map((el, i) => renderElement(el, i, dict))}
    </div>
  );
}

type ParsedElement =
  | { type: "html"; html: string }
  | { type: "statblock"; stats: { value: number; prefix?: string; suffix?: string; label: string; format?: "currency" | "percentage" | "number" }[] }
  | { type: "keytakeaway"; label?: string; text: string; cta?: boolean }
  | { type: "blogcta" }
  | { type: "calculator" }
  | { type: "checklist"; items: string[] };

function parseContent(content: string): ParsedElement[] {
  const elements: ParsedElement[] = [];
  const lines = content.split("\n");
  let i = 0;
  let htmlBuffer = "";

  const flushHtml = () => {
    if (htmlBuffer.trim()) {
      elements.push({ type: "html", html: processMarkdown(htmlBuffer) });
    }
    htmlBuffer = "";
  };

  while (i < lines.length) {
    const line = lines[i];

    // StatBlock: :::stat{value=5400 prefix="$" label="Annual impulse spending" format="currency"}
    if (line.trim().startsWith(":::stats")) {
      flushHtml();
      const stats: { value: number; prefix?: string; suffix?: string; label: string; format?: "currency" | "percentage" | "number" }[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(":::end")) {
        const statLine = lines[i].trim();
        if (statLine.startsWith("- ")) {
          const stat = parseStatLine(statLine.slice(2));
          if (stat) stats.push(stat);
        }
        i++;
      }
      elements.push({ type: "statblock", stats });
      i++; // skip :::end
      continue;
    }

    // KeyTakeaway
    if (line.trim().startsWith(":::takeaway")) {
      flushHtml();
      const labelMatch = line.match(/label="([^"]+)"/);
      const ctaMatch = line.match(/cta/);
      const label = labelMatch?.[1];
      const cta = !!ctaMatch;
      let text = "";
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(":::end")) {
        text += lines[i] + "\n";
        i++;
      }
      elements.push({ type: "keytakeaway", label, text: text.trim(), cta });
      i++; // skip :::end
      continue;
    }

    // BlogCTA
    if (line.trim() === ":::blogcta") {
      flushHtml();
      elements.push({ type: "blogcta" });
      i++;
      continue;
    }

    // Calculator
    if (line.trim() === ":::calculator") {
      flushHtml();
      elements.push({ type: "calculator" });
      i++;
      continue;
    }

    // Checklist
    if (line.trim().startsWith(":::checklist")) {
      flushHtml();
      const items: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(":::end")) {
        const item = lines[i].trim();
        if (item.startsWith("- ")) {
          items.push(item.slice(2));
        }
        i++;
      }
      elements.push({ type: "checklist", items });
      i++; // skip :::end
      continue;
    }

    htmlBuffer += line + "\n";
    i++;
  }

  flushHtml();
  return elements;
}

function parseStatLine(line: string): { value: number; prefix?: string; suffix?: string; label: string; format?: "currency" | "percentage" | "number" } | null {
  const valueMatch = line.match(/value=(\d+)/);
  const prefixMatch = line.match(/prefix="([^"]+)"/);
  const suffixMatch = line.match(/suffix="([^"]+)"/);
  const labelMatch = line.match(/label="([^"]+)"/);
  const formatMatch = line.match(/format="([^"]+)"/);

  if (!valueMatch || !labelMatch) return null;

  return {
    value: parseInt(valueMatch[1]),
    prefix: prefixMatch?.[1],
    suffix: suffixMatch?.[1],
    label: labelMatch[1],
    format: (formatMatch?.[1] as "currency" | "percentage" | "number") || "number",
  };
}

function processMarkdown(md: string): string {
  let html = md;

  // Headings (h2, h3, h4)
  html = html.replace(/^#### (.+)$/gm, (_match, text) => {
    const id = slugify(text);
    return `<h4 id="${id}">${text}</h4>`;
  });
  html = html.replace(/^### (.+)$/gm, (_match, text) => {
    const id = slugify(text);
    return `<h3 id="${id}">${text}</h3>`;
  });
  html = html.replace(/^## (.+)$/gm, (_match, text) => {
    const id = slugify(text);
    return `<h2 id="${id}">${text}</h2>`;
  });

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Unordered lists
  html = html.replace(
    /(?:^|\n)((?:- .+\n?)+)/g,
    (_match, block: string) => {
      const items = block
        .trim()
        .split("\n")
        .map((line: string) => `<li>${line.replace(/^- /, "")}</li>`)
        .join("\n");
      return `\n<ul>${items}</ul>\n`;
    }
  );

  // Ordered lists
  html = html.replace(
    /(?:^|\n)((?:\d+\. .+\n?)+)/g,
    (_match, block: string) => {
      const items = block
        .trim()
        .split("\n")
        .map((line: string) => `<li>${line.replace(/^\d+\. /, "")}</li>`)
        .join("\n");
      return `\n<ol>${items}</ol>\n`;
    }
  );

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Tables
  html = html.replace(
    /(?:^|\n)((?:\|.+\|\n?)+)/g,
    (_match, block: string) => {
      const rows = block.trim().split("\n").filter((r: string) => r.trim());
      if (rows.length < 2) return block;

      // Check if second row is a separator row (|---|---|)
      const separatorRow = rows[1];
      if (!/^\|[\s-:|]+\|$/.test(separatorRow.trim())) return block;

      const parseRow = (row: string) =>
        row.trim().replace(/^\||\|$/g, "").split("|").map((cell: string) => cell.trim());

      const headers = parseRow(rows[0]);
      const headerHtml = headers.map((h: string) => `<th>${h}</th>`).join("");

      const bodyRows = rows.slice(2);
      const bodyHtml = bodyRows
        .map((row: string) => {
          const cells = parseRow(row);
          return `<tr>${cells.map((c: string) => `<td>${c}</td>`).join("")}</tr>`;
        })
        .join("\n");

      return `\n<div class="table-wrapper"><table><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>\n`;
    }
  );

  // Paragraphs: convert double newlines to paragraph breaks
  html = html
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<div") ||
        trimmed.startsWith("<table")
      ) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

function renderElement(el: ParsedElement, key: number, dict: Dictionary) {
  switch (el.type) {
    case "html":
      return (
        <div key={key} dangerouslySetInnerHTML={{ __html: el.html }} />
      );
    case "statblock":
      return <StatBlock key={key} stats={el.stats} />;
    case "keytakeaway":
      return (
        <KeyTakeaway key={key} label={el.label} cta={el.cta}>
          {el.text}
        </KeyTakeaway>
      );
    case "blogcta":
      return <BlogCTA key={key} dict={dict} />;
    case "calculator":
      return <CostPerUseCalculator key={key} />;
    case "checklist":
      return <ProgressChecklist key={key} items={el.items} />;
    default:
      return null;
  }
}
