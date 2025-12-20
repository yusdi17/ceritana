import React from 'react'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'
import Loader from './loader';
export default function GlobalLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const show = isFetching + isMutating > 0;

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col items-center">
        <Loader />
        <p className="mt-3 text-gray-700 text-sm">Memuat...</p>
      </div>
    </div>
  )
}
