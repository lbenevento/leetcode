export async function measure(
    fn: () => any,
    label?: string
) {
    const start = Date.now()
    await fn()
    const end = Date.now()
    if (label) {

        console.log(`${label} took: ${end - start} ms`)
    } else {
        console.log(`Time taken: ${end - start} ms`)
    }
}