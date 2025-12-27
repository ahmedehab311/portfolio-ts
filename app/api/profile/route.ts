// import { connectDB } from "@/lib/db";
// import { apiResponse } from "@/lib/apiResponseBackend";
// import { Profile } from "@/models/profile/profile";
// import { NextResponse } from "next/server";


// export async function GET() {
//     try {
//         await connectDB();
//         const myProfile = await Profile.findOne();
//         if (!myProfile) {

//             return apiResponse({ statusCode: 404, status: "fail", message: "No Profile found", data: [] })
//         }
//         return apiResponse({ statusCode: 200, status: "success", message: "Profile fetched successfully", data: myProfile })
//     } catch (error: any) {
//         return apiResponse({ statusCode: 500, status: "error", message: `${error.message} ||Profile fetched successfully`, data: null })
//     }

// }
// export async function POST(req: Request) {
//     try {
//         await connectDB();
//         const body = await req.json();

//         // التحديث أو الإنشاء إذا لم يكن موجوداً
//         // نستخدم فلتر فارغ {} لأننا نريد سجل واحد فقط في هذه المجموعة
//         const updatedProfile = await Profile.findOneAndUpdate(
//             {},
//             { ...body },
//             { upsert: true, new: true, setDefaultsOnInsert: true }
//         );

//         return apiResponse({
//             statusCode: 201,
//             status: "success",
//             message: "Profile updated successfully",
//             data: updatedProfile
//         });

//     } catch (error: any) {
//         return apiResponse({
//             statusCode: 500,
//             status: "error",
//             message: `Update failed: ${error.message}`,
//             data: null
//         });
//     }
// }
// // // 2. تحديث البيانات (من لوحة التحكم بتاعتك)
// // export async function PATCH(req) {
// //     try {
// //         await dbConnect();
// //         const body = await req.json();

// //         // بنعمل Update لو موجود، أو Create لو مش موجود
// //         const updatedProfile = await Profile.findOneAndUpdate(
// //             {},
// //             { ...body, updatedAt: Date.now() },
// //             { upsert: true, new: true }
// //         );

// //         return NextResponse.json(updatedProfile);
// //     } catch (error) {
// //         return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
// //     }
// // }