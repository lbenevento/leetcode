import fs from "fs"
import readline from "node:readline/promises"
import { exec } from "child_process"

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function run(leetcode: string) {
    return new Promise<void>((resolve) => {
        exec(`node ./problems/${leetcode}/index.js`, (error, stdout, stderr) => {
            console.log(`\n\n----- LeetCode ${leetcode} -----\n`)
            if (error) console.log("Error:", error.message)
            if (stderr) console.log("stderr:", stderr)
            console.log(stdout)
            console.log("\n---------- End ----------")
            resolve()
        })
    })
}

async function main(leetcodes: string[]) {

    let lastLeetcode = ""

    while (true) {
        const selected = await readlineInterface.question(
            `\nLeatcode number${lastLeetcode && ` (empty for ${lastLeetcode})`}: `
        )
        // Runs last one
        if (!selected && lastLeetcode) await run(lastLeetcode)
        // If it exist runs the typed one
        else {
            if (leetcodes.includes(selected)) {
                lastLeetcode = selected
                await run(selected)
            }
            else console.error("This leetcode doesn't exist.\n")
        }
    }

}

fs.readdir(".", (err, files) => {

    const leetcodes: string[] = []

    for (const file of files) {
        if (Number.isNaN(parseInt(file))) continue

        leetcodes.push(file)
    }

    main(leetcodes)
})