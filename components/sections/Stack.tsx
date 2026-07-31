"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import WindowChrome from "@/components/ui/WindowChrome";
import { STACK_CHAINS } from "@/data/stack";

export default function Stack() {
  const [chainId, setChainId] = useState(STACK_CHAINS[0].id);
  const [openNode, setOpenNode] = useState<string | null>(null);

  const chain = STACK_CHAINS.find((c) => c.id === chainId) ?? STACK_CHAINS[0];

  return (
    <section id="stack">
      <WindowChrome file="stack.json" title="~/kylie/stack.json" right="dependency graph" />
      <div className="win-body">
        <div className="chain-tabs">
          {STACK_CHAINS.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                className={`chain-tab ${chainId === c.id ? "active" : ""}`}
                onClick={() => {
                  setChainId(c.id);
                  setOpenNode(null);
                }}
              >
                <Icon size={14} /> {c.label}
              </button>
            );
          })}
        </div>
        <div className="chain-flow">
          {chain.nodes.map((node, i, arr) => (
            <div key={node.name}>
              <div className="chain-node">
                <div
                  className="node-head"
                  onClick={() => setOpenNode(openNode === node.name ? null : node.name)}
                >
                  <span className="node-name">{node.name}</span>
                  {openNode === node.name ? (
                    <ChevronDown size={15} color="var(--text-faint)" />
                  ) : (
                    <ChevronRight size={15} color="var(--text-faint)" />
                  )}
                </div>
                {openNode === node.name && <div className="node-detail">{node.detail}</div>}
              </div>
              {i < arr.length - 1 && (
                <div className="chain-connector">
                  <ChevronDown size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
