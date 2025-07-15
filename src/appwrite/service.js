import config from "../config/config";
import { Client, Databases, Query, Storage, ID } from "appwrite";

export class Service {
    client = new Client();
    database;
    storage;

    constructor(){
        this.client.setProject(config.projectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    // Database related functions

    async createBlog({title, subTitle, slug, content, thumbnail, status}) {
        try {
            return await this.database.createDocument(config.databaseId, config.blogsCollectionId, slug, {
                title,
                subTitle,
                content,
                thumbnail,
                status,
                slug
            } )
        } catch (error) {
            console.log("Create Blog Error: "+ error);
            
        }
    }

    async updateBlog(slug, {title, subTitle, content, thumbnail, status}) {
        try {
            return await this.database.updateDocument(config.databaseId, config.blogsCollectionId, slug, {title, subTitle, content, thumbnail, status})
        } catch (error) {
            console.log("Update Blog Error: "+ error);
        }
    }

    async deleteBlog(slug){
        try {
            await this.database.deleteDocument(config.databaseId, config.blogsCollectionId, slug)
            return true;
        } catch (error) {
            console.log("Delete Blog Error: "+ error);
            return false;
        }
    }

    async getBlog(slug){
        try {
            return await this.database.getDocument(config.databaseId, config.blogsCollectionId, slug)
        } catch (error) {
            console.log("Get Blog Error: "+ error);
            return false;
        }
    }

    async getAllBlogs(){
        try {
            return await this.database.listDocuments(config.databaseId, config.blogsCollectionId, [Query.equal("status", "active")]);
        } catch (error) {
            console.log("Get All Blogs Error: "+ error);
            return false;
        }
    }

    // Storage related functions

    async uploadThumbnail(file){
        try {
            return await this.storage.createFile(config.thumbnailsBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Upload Thumbnail Error: "+ error);
            return false;
        }
    }

    async deleteThumbnail(fileID){
        try {
            await this.storage.deleteFile(config.thumbnailsBucketId, fileID);
            return true;
        } catch (error) {
            console.log("Delete Thumbnail Error: "+ error);
            return false;
        }
    }

    async previewThumbnail(fileID){
        try {
            return await this.storage.getFilePreview(config.thumbnailsBucketId, fileID);
        } catch (error) {
            console.log("Preview Thumbnail Error: "+ error);
            return false;
        }
    }
}

const service = new Service();

export default service;