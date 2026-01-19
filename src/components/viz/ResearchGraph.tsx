import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
    id: string;
    group: number;
    val: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: string | Node;
    target: string | Node;
}

const ResearchGraph = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!svgRef.current || !wrapperRef.current) return;

        const width = wrapperRef.current.clientWidth;
        const height = 600;

        // Clear existing
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .classed("w-full h-auto cursor-move", true);

        // Add Glow Filter
        const defs = svg.append("defs");
        const filter = defs.append("filter")
            .attr("id", "glow");
        filter.append("feGaussianBlur")
            .attr("stdDeviation", "2.5")
            .attr("result", "coloredBlur");
        const feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode").attr("in", "coloredBlur");
        feMerge.append("feMergeNode").attr("in", "SourceGraphic");

        // Data
        const nodes: Node[] = [
            { id: "Resilient Technologies", group: 1, val: 25 },
            { id: "Immersive Computing (XR)", group: 1, val: 18 },
            { id: "AI for Social Good", group: 2, val: 18 },
            { id: "Community Centered Design", group: 1, val: 14 },
            { id: "HCI", group: 3, val: 12 },
            { id: "Spatial Storytelling", group: 3, val: 12 },
            { id: "Disaster Resilience", group: 2, val: 15 },
            { id: "GIS", group: 2, val: 10 },
            { id: "Machine Learning", group: 2, val: 10 },
            { id: "Human-Space Interaction", group: 3, val: 12 },
            { id: "Digital Twins", group: 1, val: 8 },
            { id: "Accessible Tech", group: 3, val: 8 },
        ];

        const links: Link[] = [
            { source: "Resilient Technologies", target: "Immersive Computing (XR)" },
            { source: "Resilient Technologies", target: "AI for Social Good" },
            { source: "Resilient Technologies", target: "Community Centered Design" },
            { source: "Resilient Technologies", target: "Disaster Resilience" },
            { source: "Immersive Computing (XR)", target: "Spatial Storytelling" },
            { source: "Immersive Computing (XR)", target: "HCI" },
            { source: "Immersive Computing (XR)", target: "Human-Space Interaction" },
            { source: "Immersive Computing (XR)", target: "Digital Twins" },
            { source: "AI for Social Good", target: "Disaster Resilience" },
            { source: "AI for Social Good", target: "Machine Learning" },
            { source: "Disaster Resilience", target: "GIS" },
            { source: "Disaster Resilience", target: "Community Centered Design" },
            { source: "HCI", target: "Human-Space Interaction" },
            { source: "HCI", target: "Accessible Tech" },
            { source: "Spatial Storytelling", target: "HCI" },
        ];

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide().radius((d: any) => Math.sqrt(d.val) * 5 + 10));

        // Group for Zoom
        const g = svg.append("g");

        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom as any);

        const link = g.append("g")
            .attr("stroke", "#cbd5e1")
            .attr("stroke-opacity", 0.4)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 1.5);

        const node = g.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", (d) => Math.sqrt(d.val) * 4)
            .attr("fill", (d) => {
                if (d.group === 1) return "#6366f1"; // Royal
                if (d.group === 2) return "#0ea5e9"; // Sky
                return "#ec4899"; // Pink
            })
            .style("filter", "url(#glow)") // Apply Glow
            .style("cursor", "pointer")
            .call((d3.drag() as any)
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const labels = g.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .attr("text-anchor", "middle")
            .attr("dy", (d) => Math.sqrt(d.val) * 4 + 20)
            .text((d) => d.id)
            .style("font-family", "Inter, sans-serif")
            .style("font-size", "11px")
            .style("font-weight", "600")
            .style("fill", "#334155") // Slate-700
            .style("pointer-events", "none")
            .style("text-shadow", "0 1px 4px rgba(255,255,255,0.8)");

        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);

            labels
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });

        function dragstarted(event: any) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event: any) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event: any) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return () => {
            simulation.stop();
        };
    }, []);

    return (
        <div ref={wrapperRef} className="w-full relative overflow-hidden bg-white/40 backdrop-blur-sm rounded-3xl border border-white/40 shadow-xl">
            <div className="absolute top-4 left-4 z-10">
                <span className="text-xs font-bold text-royal-500 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full">Interactive Graph</span>
            </div>
            <svg ref={svgRef} className="w-full h-full" style={{ minHeight: '500px' }}></svg>
        </div>
    );
};

export default ResearchGraph;
