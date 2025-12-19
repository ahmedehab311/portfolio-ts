type ApiResponse = {
    statusCode:number
    status: "success" | "error";
    message: string;
    data: any;
};

export function apiResponse(
    body: ApiResponse,
) {
    return new Response(JSON.stringify(body), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}