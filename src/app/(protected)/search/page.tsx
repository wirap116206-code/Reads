"use client";

import Container from "@/components/general/layouts/Container";
import LoadingSpinner from "@/components/search/LoadingSpinner";
import SearchCard from "@/components/search/SearchCard";
import { User } from "@/types/user";
import axios from "axios";
import { Search, UserSearch } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get<User[]>("/api/users/search", {
          params: { q: query.trim() },
          signal: controller.signal,
        });

        setUsers(res.data);
      } catch (err) {
        if (axios.isCancel(err)) return;

        console.error("SEARCH_ERROR:", err);
        setError("Gagal memuat pengguna. Coba lagi.");
        setUsers([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(delay);
      controller.abort();
    };
  }, [query]);

  return (
    <Container title="Search">
      <div className="flex items-center gap-3 py-3 px-4 bg-background border border-border rounded-xl">
        <Search size={18} className="text-text-muted" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search"
          aria-label="Search users"
          className="w-full bg-transparent text-sm text-white placeholder:text-text-muted focus:outline-none"
        />
      </div>

      <h2 className="font-semibold text-text-muted my-4">
        {query.trim() ? "Search results" : "Follow Suggestions"}
      </h2>

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="py-8 text-center text-sm text-red-500">{error}</div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="flex flex-col items-center justify-center py-14 text-text-muted space-y-4">
          <UserSearch size={36} className="mb-3 opacity-70" />
          <p className="text-sm font-medium">No user found</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="space-y-3">
          {users.map((user) => (
            <SearchCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </Container>
  );
}
