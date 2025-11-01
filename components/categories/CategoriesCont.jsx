'use client'
import { Suspense } from 'react'
import CategoriesWrapper from '@/components/categories/CategoriesWrapper'
import React from 'react'
export default function CategoriesCont() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
        <CategoriesWrapper />
      </Suspense>
    )
}
