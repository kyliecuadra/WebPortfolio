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
        <div className="chain-tabs" role="tablist" aria-label="Stack category">
          {STACK_CHAINS.map((c) => {
            const Icon = c.icon;
            const active = chainId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`chain-tab ${active ? "active" : ""}`}
                onClick={() => {
                  setChainId(c.id);
                  setOpenNode(null);
                }}
              >
                <Icon size={14} aria-hidden="true" /> {c.label}
              </button>
            );
          })}
        </div>
        <div className="chain-flow" role="tabpanel">
          {chain.nodes.map((node, i, arr) => {
            const isOpen = openNode === node.name;
            const detailId = `node-detail-${chainId}-${i}`;
            return (
              <div key={node.name}>
                <div className="chain-node">
                  <button
                    type="button"
                    className="node-head"
                    onClick={() => setOpenNode(isOpen ? null : node.name)}
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                  >
                    <span className="node-name">{node.name}</span>
                    {isOpen ? (
                      <ChevronDown size={15} color="var(--text-faint)" aria-hidden="true" />
                    ) : (
                      <ChevronRight size={15} color="var(--text-faint)" aria-hidden="true" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="node-detail" id={detailId}>
                      {node.detail}
                    </div>
                  )}
                </div>
                {i < arr.length - 1 && (
                  <div className="chain-connector" aria-hidden="true">
                    <ChevronDown size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
