'use client'
import ContentDetailModel from "./ModelUI/ContentDetailModel";
import { useState } from "react";
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";


const ArticleSection = ({ data, capsuleDataCount }) => {
    const [openModel, setOpenModel] = useState(false);
    const [modelData, setModelData] = useState("");

    const openModelFunc = (data) => {
        setModelData(data);
        setOpenModel(true);
    }
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = parseInt(searchParams.get("page"))
      ? parseInt(searchParams.get("page"))
      : 1;
    const maxPage = Math.ceil(100 / 9);
    const count = 100;
    const startIndex = (page - 1) * 9;
    const resultEnd = Math.min(startIndex + 9, data.length + 9);

    const pageChange = (val) => {
        router.push(`/?page=${val}`);
    };

    return (
        <>
            <ContentDetailModel data={modelData} open={openModel} setOpen={setOpenModel} />
            <div className=" py-24">
                <div className="mx-auto max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 ">
                    <div className="flex justify-center items-center">
                        <div className="max-w-2xl flex flex-col items-center justify-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Meet our leadership</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300 text-center">
                                Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
                                suspendisse.
                            </p>
                        </div>
                    </div>
                    <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-3 sm:gap-y-16 xl:col-span-2 pt-24 ">
                        {data.map((post, index) => (

                            <div className="card hover:scale-105" key={index} onClick={() => openModelFunc(post)}>
                                <div className="main-content">
                                    <div className="header">
                                        <span>Lauch date</span>
                                        <span className="text-sm">{post.original_launch ? post.original_launch?.split("T")[0] : ""}</span>
                                    </div>
                                    <p className="heading">{post.details ? post.details : post.capsule_serial}</p>
                                    <div className="categories flex-wrap">
                                        {
                                            post.missions.map((mission, index) => (
                                                <span className="shrink-0" key={index}>{mission.name} {mission.flight} Flights</span>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="footer">
                                    {post.type}
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <Pagination
                maxPage={maxPage}
                dataCount={count}
                datalength={resultEnd}
                pageChange={pageChange}
                page={page}
            />
        </>
    )
}

export default ArticleSection;