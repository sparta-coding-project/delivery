const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { dataSource } = require('../typeorm')

class ResumeRepository {
    selectAllSortedResumes = async (sort) => {
        const resumes = await prisma.resume.findMany({
            select: {
                resumeId: true,
                title: true,
                content: true,
                status: true,
                user: {
                    select: {
                        name: true,
                    },
                },
                createdAt: true,
            },
            orderBy: [
                {
                    [sort.orderKey]: sort.orderValue,
                },
            ],
        })
        return resumes
    }

    selectOneResumeByResumeId = async (resumeId) => {
        // const resume = await prisma.resume.findFirst({
        //     where: {
        //         resumeId: +resumeId,
        //     },
        //     select: {
        //         resumeId: true,
        //         title: true,
        //         content: true,
        //         status: true,
        //         user: {
        //             select: {
        //                 name: true,
        //             },
        //         },
        //         createdAt: true,
        //     },
        // })
        const resume = await dataSource.getRepository('Resume').findOne({
            where: {
                resumeId: +resumeId,
            },
            select: {
                resumeId: true,
                title: true,
                content: true,
                status: true,
                user: {
                    select: {
                        name: true,
                    },
                },
                createdAt: true,
            },
        })
        return resume
    }

    createResume = async (data) => {
        await prisma.resume.create({
            data, // 어떤걸 저장하게 되는지는 biz logic이라 service에 명시함
        })
    }

    updateResumeByResumeId = async (resumeId, data) => {
        // 내가 작성한 이력서이거나 권한 등급이 admin이다.
        await prisma.resume.update({
            where: {
                resumeId: +resumeId,
            },
            data,
        })
    }

    deleteResumeByResumeId = async (resumeId) => {
        await prisma.resume.delete({
            where: {
                resumeId: +resumeId,
            },
        })
    }
}

const resumeRepository = new ResumeRepository()
module.exports = resumeRepository
