"use client"
export const dynamic = 'force-dynamic'
import {
    Card,
    CardTitle,
    CardContent,
    CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { BarChart3, BookOpen, Calculator, ClipboardList, Globe, GraduationCap, MapPin, MessageCircle, Phone, User } from "lucide-react"

export default function Page() {

    const [math1, setMath1] = useState("")
    const [math2, setMath2] = useState("")
    const [verbal1, setVerbal1] = useState("")
    const [verbal2, setVerbal2] = useState("")
    const [mathTotal, setMathTotal] = useState(null)
    const [verbalTotal, setVerbalTotal] = useState(null)

    const handleMath = async () => {
        try {
            const res = await fetch(`/api/math/${math1}/${math2}`)
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

    const total = mathTotal && verbalTotal && !mathTotal.error && !verbalTotal.error
        ? String(Number(mathTotal[0]) + Number(verbalTotal[0]))
        : null

    return (
        <div className="flex flex-col justify-center items-center gap-8 p-4">
            <div className="mt-4 text-center items-center">
                <div className="flex justify-center">
                    <img src="the-dot.png" alt="the dot Logo" className="w-100 h-100" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-[#001B7A] md:text-6xl">SAT Score Calculator</h1>
                <p className="mt-4 text-lg text-slate-500 md:text-2xl">Calculate your estimated SAT score instantly</p>
            </div>
            <section className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="rounded-3xl border-slate-100 shadow-lg">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                                <Calculator className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold text-[#0B2A8A]">Math</h2>
                                <p className="mt-1 text-slate-500">Enter the number of correct answers</p>
                            </div>
                        </div>
                        <div className="mt-10 space-y-6">
                            <div>
                                <label className="mb-3 block text-lg font-semibold text-slate-800">Module 1 {""}
                                    <span className="font-normal text-slate-400">(No. of correct answers)</span>
                                </label>
                                <Input type="number" placeholder="Enter score" value={math2} onChange={(e) => setMath2(e.target.value)} className="h-14 rounded-xl text-lg" />
                            </div>
                            <div>
                                <label className="mb-3 block text-lg font-semibold text-slate-800">Module 2 {""}
                                    <span className="font-normal text-slate-400">(No. of correct answers)</span>
                                </label>
                                <Input type="number" placeholder="Enter score" value={math1} onChange={(e) => setMath1(e.target.value)} className="h-14 rounded-xl text-lg" />
                            </div>
                            <Button className="h-14 w-full rounded-xl bg-blue-600 font-semibold hover:bg-blue-700" onClick={handleMath}><Calculator className="mr-2 h-5 w-5"/>Calculate Math Score</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl border-slate-100 shadow-lg">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                                <BookOpen className="h-8 w-8"/>
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold text-[#0B2A8A]">Verbal</h2>
                                <p className="mt-1 text-slate-500">Enter the number of correct answers</p>
                            </div>
                        </div>
                        <div className="mt-10 space-y-6">
                            <div>
                                <label className="mb-3 block text-lg font-semibold text-slate-800">Module 1{" "}
                                    <span className="font-normal text-slate-400">(No. of correct answers)</span>
                                </label>
                                <Input type="number" placeholder="Enter score" value={verbal2} onChange={(e) => setVerbal2(e.target.value)} className="h-14 rounded-xl text-lg" />
                            </div>
                            <div>
                                <label className="mb-3 block text-lg font-semibold text-slate-800">Module 2{" "}
                                    <span className="font-normal text-slate-400">(No. of correct answers)</span>
                                </label>
                                <Input type="number" placeholder="Enter score" value={verbal1} onChange={(e) => setVerbal1(e.target.value)} className="h-14 rounded-xl text-lg" />
                            </div>
                            <Button className="h-14 w-full rounded-xl bg-blue-600 text-lg font-semibold hover:bg-blue-700" onClick={handleVerbal}><BookOpen className="mr-2 h-5 w-5"/>Calculate Verbal Score</Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="rounded-3xl border border-slate-100 bg-[#f8faff] shadow-lg">
                    <CardContent className="p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                                <BarChart3 className="h-8 w-8"/>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-4xl font-bold text-[#0B2A8A]">Your Estimated Score</h2>
                                <div className="mt-4 h-px bg-slate-300"/>
                            </div>
                        </div>
                        <div className="mt-10 space-y-5">
                            <div className="flex h-24 items-center justify-between rounded-2xl border border-slate-200 bg-white px-8">
                                <span className="text-3xl font-semibold text-slate-800">Math Score</span>
                                <span>{mathTotal && !mathTotal.error && (<div className="text-4xl font-bold text-blue-600">{mathTotal}</div>)}</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex h-24 items-center justify-between rounded-2xl border border-slate-200 bg-white px-8">
                                <span className="text-3xl font-semibold text-slate-800">Verbal Score</span>
                                <span>{verbalTotal && !verbalTotal.error &&(<div className="text-4xl font-bold text-blue-600">{verbalTotal}</div>)}</span>
                            </div>
                        </div>
                        <div className="border-t border-dashed border-slate-300 pt-6">
                            <div className="flex h-32 items-center justify-between rounded-2xl bg-blue-600 px-8 py-8 text-white shadow-lg">
                                <div>
                                    <h3 className="text-4xl font-bold">Total Score</h3>
                                    <p className="mt-2 text-xl">(400 - 1600)</p>
                                </div>
                                <span>{mathTotal && !mathTotal.error && verbalTotal && !verbalTotal.error && (<div className="text-4xl font-bold">{total}</div>)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
            <Card className="mt-8 rounded-3xl border border-slate-100 shadow-lg">
                <CardContent className="p-8">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                        <div className="flex flex-col gap-8 md:flex-row">
                            <div className="flex h-56 w-56 item center justify-center rounded-2xl bg-slate-100 text-lg font-semibold text-slate-400">
                                <img src="qrcode.png" alt="QRCode"></img>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-4xl font-bold text-[#0B2A8A]">THE DOT International Programs</h2>
                                <p className="mt-3 text-lg text-slate-500"> SAT • GED • IELTS • International Study Programs</p>
                                <div className="mt-8 space-y-4 text-slate-700">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-1 h-10 w-10 text-blue-600" />
                                        <p>MBK Center 5th Floor, Zone A, Pathum Wan, Bangkok 10330</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MessageCircle className="h-5 w-5 text-green-500" />
                                        <p>Line ID: @910tgbdy</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-blue-600" />
                                        <p>Tel: 098-723-8938</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-l border-slate-200 pl-0 lg:pl-10">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                                <GraduationCap  className="h-7 w-7 text-blue-600"/>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-[#0B2A8A]">About THE DOT</h3>
                                <p className="mt-3 text-lg leading-relaxed text-slate-500">
                                    We are an education institute that helps students
                                    unlock their potential and achieve their goals.
                                </p>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
                            {[
                                {icon: User, label: "Expert Instruction"},
                                {icon: ClipboardList, label: "Proven Results"},
                                {icon: BookOpen, label: "Personalized Coaching"},
                                {icon: Globe, label: "Global Opportunities"},
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                <div key={i} className="text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50">
                                        <Icon className="h-7 w-7 text-blue-600"/>
                                    </div>
                                    <p className="mt-3 text-sm font-medium leading-snug text-slate-700">{item.label}</p>
                                </div>
                            )
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <footer className="mt-10 rounded-t-3xl bg-blue-600 py-5 text-center text-white">
                © 2024 THEDOT and Mathlogik Co.,Ltd All rights reserved.
            </footer>
        </div>
    )
}