"use client"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

type Props = {
    applied: number,
    interview: number,
    rejected: number,
    offer: number

}


export default function StatusChart({ applied, interview, rejected, offer }: Props) {

    const data = [
    { name: "Applied", value: applied },
    { name: "Interview", value: interview },
    { name: "Offer", value: offer },
    { name: "Rejected", value: rejected },
]
    const COLORS = ["#3b82f6", "#eab308", "#22c55e", "#ef4444"]

    return (
        <div style={{ width: '100%' }}>
            <h2 className="text-xl font-bold text-gray-500 mb-4">Applications by Status</h2>
            <PieChart width={400} height={300}>
            <Pie
                data={data}
                cx={200}
                cy={150}
                outerRadius={100}
                dataKey="value"
                label
            >
                {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                ))}
            </Pie>
            <Tooltip />
    <Legend />
</PieChart>
        </div>
    )

}