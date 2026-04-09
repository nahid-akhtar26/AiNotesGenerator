import mermaid from "mermaid";
import { useEffect, useRef } from "react";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        let safeChart = cleanMermaidChart(diagram);

        // ✅ apply only if needed
        if (safeChart.includes("[")) {
          safeChart = autoFixNodes(safeChart);
        }

        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.log("Mermaid render failed:", error);
      }
    };

    renderDiagram();
  }, [diagram]);

  const cleanMermaidChart = (diagram) => {
    if (!diagram) return "";

    let clean = diagram.replace(/\r?\n/g, "\n").trim();

    if (!clean.startsWith("graph")) {
      clean = `graph TD\n${clean}`;
    }

    return clean;
  };

 const autoFixNodes = (diagram) => {
  let index = 0;
  const used = new Map();

  return diagram.replace(/\[(.*?)\]/g, (match, label) => {
    const key = label.trim();

    // reuse same node if label already seen
    if (used.has(key)) {
      return used.get(key);
    }

    index++;
    const id = `N${index}`;
    const node = `${id}["${key}"]`;

    used.set(key, node);
    return node;
  });
};
  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef} />
    </div>
  );
};

export default MermaidSetup;