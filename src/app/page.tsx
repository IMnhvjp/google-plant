'use client'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Head from "next/head";
import SearchBar from "./components/searchBar";

import Image from "next/image";

export default function Home() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-blue-600">
          Plant<span className="text-green-500">Search</span>
        </h1>
      </div>

      {/* Search Bar */}
      <SearchBar />

      {/* Footer */}
    </div>
    )
}
