"use client"

import {
    Card,
    CardTitle,
    CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function HomePage() {

    const [math1, setMath1] = useState("")
    const [math2, setMath2] = useState("")
    const [verbal1, setVerbal1] = useState("")
    const [verbal2, setVerbal2] = useState("")
    const [mathTotal, setMathTotal] = useState(null)
    const [verbalTotal, setVerbalTotal] = useState(null)

    const handleMath = async () => {
        try {
            const res = await fetch(`api/math/${math1}/${math2}`)
            const data = await res.json()
            setMathTotal(data)
        } catch {
            setMathTotal({ error: "Cannot fetch score"})
        }
    }

    const handleVerbal = async () => {
        try {
            const res = await fetch(`api/verbal/${verbal1}/${verbal2}`)
            const data = await res.json()
            setVerbalTotal(data)
        } catch {
            setVerbalTotal({ error: "Cannot fetch score"})
        }
    }

    const total = String(Number(mathTotal[0]) + Number(verbalTotal[0]))

    return (
        <div className="flex flex-col items-center gap-8 p-8">
            <h1 className="font-bold text-2xl text-center pt-8 pb-8">SAT Score Calculator</h1>
            <section>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                <Card>
                    <CardTitle className="text-center font-semibold">Math</CardTitle>
                    <CardContent className="flex flex-col items-center">
                        <Input type="number" placeholder="Module 1" value={math2} onChange={(e) => setMath2(e.target.value)} className="border p-4 rounded m-1" />
                        <Input type="number" placeholder="Module 2" value={math1} onChange={(e) => setMath1(e.target.value)} className="border p-4 rounded m-1" />
                        <Button className="items-center px-4 py-2 rounded-xl" onClick={handleMath}>Calculate Math</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardTitle className="text-center font-semibold">Verbal</CardTitle>
                    <CardContent className="flex flex-col items-center">
                        <Input type="number" placeholder="Module 1" value={verbal2} onChange={(e) => setVerbal2(e.target.value)} className="border p-4 rounded m-1" />
                        <Input type="number" placeholder="Module 2" value={verbal1} onChange={(e) => setVerbal1(e.target.value)} className="border p-4 rounded m-1" />
                        <Button className="items-center px-4 py-2 rounded-xl" onClick={handleVerbal}>Calculate Verbal</Button>
                    </CardContent>
                </Card>
                </div>
                <div className="h-full">
                    <Card className="h-full">
                        <CardTitle className="text-center font-semibold">Score</CardTitle>
                        <CardContent>
                            <ul>
                                <li>Math Score: {mathTotal && !mathTotal.error && (<div className="text-xl">{mathTotal}</div>)}</li>
                                <li>Verbal Score: {verbalTotal && !verbalTotal.error &&(<div className="text-xl">{verbalTotal}</div>)}</li>
                                <li>Total Score: {mathTotal && !mathTotal.error && verbalTotal && !verbalTotal.error && (<div className="text-xl">{total}</div>)}</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
            </section>
        </div>
    )
}