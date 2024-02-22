const { dataSource } = require('../typeorm')

class ResumeRepository {
    selectAllSortedResumes = async (sort) => {
        const resumes = await dataSource.getRepository('Resume').find({
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
            order: {
                [sort.orderKey]: sort.orderValue,
            },
        })
        return resumes
    }

    selectOneResumeByResumeId = async (resumeId) => {
        const resume = await dataSource.getRepository('Resume').findOne({
            where: {
                resumeId: +resumeId,
            },
            select: {
                resumeId: true,
                title: true,
                content: true,
                status: true,
                userId: true,
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
        await dataSource.getRepository('Resume').insert(data) // 어떤걸 저장하게 되는지는 biz logic이라 service에 명시함
    }

    updateResumeByResumeId = async (resumeId, data) => {
        // 내가 작성한 이력서이거나 권한 등급이 admin이다.
        await dataSource
            .getRepository('Resume')
            .update({ resumeId: +resumeId }, data)
    }

    deleteResumeByResumeId = async (resumeId) => {
        await dataSource.getRepository('Resume').delete({
            resumeId: +resumeId,
        })
    }
}

const resumeRepository = new ResumeRepository()
module.exports = resumeRepository
