export default function fileExtension(filename: string, opts?: {
    preserveCase?: boolean
}) {
    if (!opts) opts = {};
    if (!filename) return "";
    const ext = (/[^./\\]*$/.exec(filename) || [""])[0];
    return opts.preserveCase ? ext : ext.toLowerCase();
}