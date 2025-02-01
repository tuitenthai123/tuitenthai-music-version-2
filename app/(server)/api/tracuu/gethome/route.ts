const nhaccuatuiApi = require("nhaccuatui-api");

export async function GET(request: Request) {
    try {
        console.log("meomeo:",await nhaccuatuiApi.getHome())
        return new Response(JSON.stringify("ádasd"),{ status: 200 });
    } catch (error) {
        console.error("Error deleting users:", error);
        return new Response(
            JSON.stringify({ error: "Error deleting users" }),
            { status: 500 }
        );
    }
}