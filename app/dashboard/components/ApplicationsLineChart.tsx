"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
type Props = {
    data: {date: string, count: number}[]
}

export default function ApplicationsLineChart({data}: Props) {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-500 mb-4">Applications Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
        </div>
    )

}