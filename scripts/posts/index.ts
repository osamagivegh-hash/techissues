// Main posts data file - combines all categories

import { arProgrammingPosts } from './ar-programming';
import { arTechIssuesPosts } from './ar-tech-issues';
import { arDeviceReviewsPosts } from './ar-device-reviews';
import { enProgrammingPosts } from './en-programming';
import { enTechIssuesPosts } from './en-tech-issues';
import { enDeviceReviewsPosts } from './en-device-reviews';

interface CategoryRefs {
    programming: { _id: string } | null;
    techIssues: { _id: string } | null;
    deviceReviews: { _id: string } | null;
}

export function getArabicPosts(categories: CategoryRefs) {
    const posts = [];

    // Programming posts
    for (const post of arProgrammingPosts) {
        posts.push({
            ...post,
            category: categories.programming?._id,
            language: 'ar',
            status: 'published',
        });
    }

    // Tech Issues posts
    for (const post of arTechIssuesPosts) {
        posts.push({
            ...post,
            category: categories.techIssues?._id,
            language: 'ar',
            status: 'published',
        });
    }

    // Device Reviews posts
    for (const post of arDeviceReviewsPosts) {
        posts.push({
            ...post,
            category: categories.deviceReviews?._id,
            language: 'ar',
            status: 'published',
        });
    }

    return posts;
}

export function getEnglishPosts(categories: CategoryRefs) {
    const posts = [];

    // Programming posts
    for (const post of enProgrammingPosts) {
        posts.push({
            ...post,
            category: categories.programming?._id,
            language: 'en',
            status: 'published',
        });
    }

    // Tech Issues posts
    for (const post of enTechIssuesPosts) {
        posts.push({
            ...post,
            category: categories.techIssues?._id,
            language: 'en',
            status: 'published',
        });
    }

    // Device Reviews posts
    for (const post of enDeviceReviewsPosts) {
        posts.push({
            ...post,
            category: categories.deviceReviews?._id,
            language: 'en',
            status: 'published',
        });
    }

    return posts;
}
