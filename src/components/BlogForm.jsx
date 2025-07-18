import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TextEditor } from "./index"
import service from '../appwrite/service'
import { useSelector } from 'react-redux'

function BlogForm({ blog }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: blog?.title || "",
            subTitle: blog?.subTitle || "",
            slug: blog?.$id || "",
            content: blog?.content || "",
            status: blog?.status || "active",
        },
    });

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (blog) {

            const file = data.image[0] ? service.uploadThumbnail(data.image[0]) : undefined

            if (file) {
                service.deleteThumbnail(blog.thumbnail)
            }

            const dbBlog = await service.updateBlog(blog.$id, {
                ...data,
                thumbnail: file ? file.$id : blog.thumbnail,
            })

            if (dbBlog) {
                navigate(`/blog/${dbBlog.$id}`)
            }
        }
        else {
            const file = await service.uploadThumbnail(data.image[0]);

            const dbBlog = await service.createBlog({
                ...data,
                userId: user.$id
            })

            if (dbBlog) {
                navigate(`/blog/${dbBlog.$id}`)
            }
        }
    }

    const slugValue = (value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Sub Title :"
                    placeholder="Sub Title"
                    className="mb-4"
                    {...register("subTitle")}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugValue(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <TextEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Thumbnail Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !blog })}
                />
                {blog && (
                    <div className="w-full mb-4">
                        <img
                            src={service.previewThumbnail(blog.thumbnail)}
                            alt={blog.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={blog ? "bg-green-500" : undefined} className="w-full">
                    {blog ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default BlogForm
