import { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node extends d3.SimulationNodeDatum {
    id: string;
    group: number;
    val: number;
    type: 'theme' | 'project' | 'publication' | 'collaboration';
    description: string;
    year?: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    source: string | Node;
    target: string | Node;
}

const ResearchGraph = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [activeTypes, setActiveTypes] = useState<Record<Node['type'], boolean>>({
        theme: true,
        project: true,
        publication: true,
        collaboration: true,
    });
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    const fullData = useMemo(() => {
        const nodes: Node[] = [
            { id: "Resilient Technologies", group: 1, val: 26, type: 'theme', description: "Systems and platforms that strengthen housing recovery and community resilience." },
            { id: "Immersive Computing (XR)", group: 1, val: 20, type: 'theme', description: "Augmented and virtual reality for spatial narratives and embodied experience." },
            { id: "AI for Social Good", group: 2, val: 18, type: 'theme', description: "Applied AI for decision support, safety, and community impact." },
            { id: "Community Centered Design", group: 1, val: 14, type: 'theme', description: "Co-design approaches grounded in real-world community needs." },
            { id: "HCI", group: 3, val: 12, type: 'theme', description: "Human-computer interaction and experience-driven design." },
            { id: "Spatial Storytelling", group: 3, val: 12, type: 'theme', description: "Narrative placement, presence, and memory in physical space." },
            { id: "Disaster Resilience", group: 2, val: 15, type: 'theme', description: "Preparedness, risk reduction, and recovery systems." },
            { id: "GIS", group: 2, val: 10, type: 'theme', description: "Spatial analysis and mapping for risk and planning." },
            { id: "Machine Learning", group: 2, val: 10, type: 'theme', description: "Models for classification, prediction, and decision support." },
            { id: "Human-Space Interaction", group: 3, val: 12, type: 'theme', description: "How people move, perceive, and act in built environments." },
            { id: "Digital Twins", group: 1, val: 8, type: 'theme', description: "Spatial data modeling and real-time representation." },
            { id: "Accessible Tech", group: 3, val: 8, type: 'theme', description: "Inclusive systems for diverse user abilities and contexts." },

            { id: "PD3R (Call for Code Finalist)", group: 2, val: 14, type: 'project', description: "AI-based mobile tool to assess post-disaster housing retrofit potential.", year: "2018" },
            { id: "Resilient Housing in a Box", group: 1, val: 14, type: 'project', description: "End-to-end platform for housing recovery programs.", year: "2022–2023" },
            { id: "Technical Assistance Platform", group: 1, val: 12, type: 'project', description: "Data collection and workflow system for housing programs.", year: "2021–2023" },
            { id: "Global Risk Awareness App", group: 2, val: 10, type: 'project', description: "Hazard mapping and vulnerability awareness for communities.", year: "2018–2021" },
            { id: "ISAC-SIMO Open Source QA", group: 2, val: 10, type: 'project', description: "Open-source construction QA with AI image evaluation.", year: "2020–2021" },

            { id: "ICIDS 2025: Immersive AR Narrative Methodology", group: 3, val: 10, type: 'publication', description: "Phased methodology for AR narrative creation.", year: "2025" },
            { id: "VR for Active Aging (2025)", group: 3, val: 9, type: 'publication', description: "Explores first-time VR experiences for older adults.", year: "2025" },
            { id: "Deep Learning for Precision Fish Farming", group: 2, val: 8, type: 'publication', description: "Survey of deep learning in aquaculture monitoring.", year: "2023" },

            { id: "Dalhousie University", group: 3, val: 11, type: 'collaboration', description: "PhD research in HCI, AR/VR, and spatial storytelling.", year: "2023–Present" },
            { id: "Build Change", group: 1, val: 11, type: 'collaboration', description: "Global resilient housing programs and platforms.", year: "2018–2023" },
            { id: "Institute of Crisis Management Studies", group: 2, val: 8, type: 'collaboration', description: "Teaching GIS and remote sensing.", year: "2023" },
        ];

        const links: Link[] = [
            { source: "Resilient Technologies", target: "Disaster Resilience" },
            { source: "Resilient Technologies", target: "Community Centered Design" },
            { source: "Resilient Technologies", target: "Resilient Housing in a Box" },
            { source: "Resilient Technologies", target: "Technical Assistance Platform" },
            { source: "Resilient Technologies", target: "Build Change" },
            { source: "Immersive Computing (XR)", target: "Spatial Storytelling" },
            { source: "Immersive Computing (XR)", target: "Human-Space Interaction" },
            { source: "Immersive Computing (XR)", target: "HCI" },
            { source: "Immersive Computing (XR)", target: "ICIDS 2025: Immersive AR Narrative Methodology" },
            { source: "Immersive Computing (XR)", target: "Dalhousie University" },
            { source: "AI for Social Good", target: "Machine Learning" },
            { source: "AI for Social Good", target: "PD3R (Call for Code Finalist)" },
            { source: "AI for Social Good", target: "ISAC-SIMO Open Source QA" },
            { source: "Disaster Resilience", target: "GIS" },
            { source: "Disaster Resilience", target: "Global Risk Awareness App" },
            { source: "Community Centered Design", target: "Build Change" },
            { source: "HCI", target: "VR for Active Aging (2025)" },
            { source: "HCI", target: "Accessible Tech" },
            { source: "Spatial Storytelling", target: "ICIDS 2025: Immersive AR Narrative Methodology" },
            { source: "GIS", target: "Global Risk Awareness App" },
            { source: "Machine Learning", target: "Deep Learning for Precision Fish Farming" },
            { source: "Dalhousie University", target: "VR for Active Aging (2025)" },
            { source: "Build Change", target: "Resilient Housing in a Box" },
            { source: "Build Change", target: "Technical Assistance Platform" },
            { source: "Institute of Crisis Management Studies", target: "GIS" },
        ];

        return { nodes, links };
    }, []);

    useEffect(() => {
        if (!svgRef.current || !wrapperRef.current) return;

        const width = wrapperRef.current.clientWidth;
        const height = 560;

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

        const nodes = fullData.nodes.filter((n) => activeTypes[n.type]);
        const nodeIds = new Set(nodes.map((n) => n.id));
        const links = fullData.links.filter((l) => nodeIds.has(l.source as string) && nodeIds.has(l.target as string));

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
            .on("mouseover", function (_, d) {
                d3.select(this).attr("stroke", "#1e293b").attr("stroke-width", 3);
                tooltip
                    .style("opacity", 1)
                    .html(`<div style="font-weight:700; margin-bottom:4px;">${d.id}</div><div style="font-size:12px; color:#475569;">${d.description}</div>`);
            })
            .on("mousemove", function (event) {
                tooltip.style("left", `${event.offsetX + 16}px`).style("top", `${event.offsetY + 16}px`);
            })
            .on("mouseout", function () {
                d3.select(this).attr("stroke", "#fff").attr("stroke-width", 2);
                tooltip.style("opacity", 0);
            })
            .on("click", (_, d) => {
                setSelectedNode(d);
            })
            .call((d3.drag() as any)
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const tooltip = d3
            .select(wrapperRef.current)
            .append("div")
            .attr("class", "glass-panel")
            .style("position", "absolute")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("color", "white")
            .style("padding", "12px 16px")
            .style("border-radius", "16px")
            .style("font-size", "13px")
            .style("max-width", "260px")
            .style("z-index", "50")
            .style("backdrop-filter", "blur(12px)");

        const labels = g.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .attr("text-anchor", "middle")
            .attr("dy", (d) => Math.sqrt(d.val) * 4 + 20)
            .text((d) => d.id)
            .style("font-family", "Space Grotesk, sans-serif")
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
            tooltip.remove();
        };
    }, [activeTypes, fullData]);

    return (
        <div className="space-y-6">
            <div ref={wrapperRef} className="w-full relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-[2.5rem] border border-white/60 shadow-xl">
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                    <span className="text-[11px] font-bold text-royal-700 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full">Research Network</span>
                    <button
                        onClick={() => setSelectedNode(null)}
                        className="text-[11px] font-semibold text-midnight-600 bg-white/70 px-3 py-1 rounded-full border border-white/70 hover:border-royal-200 transition-colors"
                    >
                        Clear Selection
                    </button>
                </div>
                <div className="absolute top-4 right-4 z-10 hidden md:flex flex-wrap gap-2">
                    {([
                        { key: 'theme', label: 'Themes' },
                        { key: 'project', label: 'Projects' },
                        { key: 'publication', label: 'Publications' },
                        { key: 'collaboration', label: 'Collaborations' },
                    ] as const).map((item) => (
                        <label key={item.key} className="flex items-center gap-2 text-[11px] font-semibold text-midnight-600 bg-white/70 px-3 py-1 rounded-full border border-white/70">
                            <input
                                type="checkbox"
                                checked={activeTypes[item.key]}
                                onChange={() => setActiveTypes((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                                className="h-3.5 w-3.5 rounded border-midnight-300 text-royal-600 focus:ring-royal-500"
                            />
                            {item.label}
                        </label>
                    ))}
                </div>
                <svg ref={svgRef} className="w-full h-full" style={{ minHeight: '560px' }}></svg>
            </div>

            <div className="surface-card rounded-3xl p-6 md:p-8 grid lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
                <div>
                    <h3 className="text-xl font-display font-bold text-midnight-900 mb-3">Explore the Network</h3>
                    <p className="text-sm text-midnight-600 mb-6">
                        Hover for quick summaries. Click nodes to lock details. Drag nodes to reshape the map.
                    </p>

                    <div className="grid grid-cols-2 gap-3 md:hidden">
                        {([
                            { key: 'theme', label: 'Themes' },
                            { key: 'project', label: 'Projects' },
                            { key: 'publication', label: 'Publications' },
                            { key: 'collaboration', label: 'Collaborations' },
                        ] as const).map((item) => (
                            <label key={item.key} className="flex items-center gap-2 text-xs text-midnight-700 bg-white/70 px-3 py-2 rounded-2xl border border-white/70">
                                <input
                                    type="checkbox"
                                    checked={activeTypes[item.key]}
                                    onChange={() => setActiveTypes((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                                    className="h-4 w-4 rounded border-midnight-300 text-royal-600 focus:ring-royal-500"
                                />
                                {item.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl bg-white/70 border border-white/70 p-5">
                    <p className="text-xs uppercase tracking-widest text-midnight-400 mb-3">Selected Node</p>
                    {selectedNode ? (
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold text-midnight-900">{selectedNode.id}</h4>
                            {selectedNode.year && <p className="text-xs text-royal-600 font-semibold">{selectedNode.year}</p>}
                            <p className="text-sm text-midnight-600">{selectedNode.description}</p>
                            <p className="text-xs text-midnight-500 uppercase tracking-wide">{selectedNode.type}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-midnight-500">Select a node to view details.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResearchGraph;
