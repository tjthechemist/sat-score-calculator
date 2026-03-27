import fs from "fs"
import path from "path"
import csv from "csv-parser"

export async function GET(request, { params }) {

    const { slug } = await params
    if(!slug || slug.length != 2) {
        return Response.json({ error:"missing parameter" })
    }
    const [math1, math2] = slug;
    const filePath = path.join(process.cwd(), "data", "MathScore.csv")
    const results  = []

    return new Promise((resolve) => {
        fs.createReadStream(filePath).pipe(csv()).on("data", (row) => {
            if (row.module1 === math1 && row.module2 === math2) {
                results.push(row.sat_score)
            }
        }).on("end", () => {
            resolve(Response.json(results))
        })
    })
}