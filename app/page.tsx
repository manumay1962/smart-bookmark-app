"use client"

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export default function Home() {
  const [user, setUser] = useState<any>(null)

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  useEffect(() => {
    if (user) fetchBookmarks()
  }, [user])

  useEffect(() => {
    const channel = supabase
      .channel("realtime bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }

  const addBookmark = async () => {
    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])
    setTitle("")
    setUrl("")
    fetchBookmarks()
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id)
    fetchBookmarks()
  }

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  /* ================= LOGIN UI ================= */
if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-600">

      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* LEFT PANEL */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-600 items-center justify-center p-12 text-white">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Smart Bookmark
            </h1>
            <p className="text-lg opacity-90">
              Manage your links beautifully and access them anywhere in real-time.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10">

          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Sign In
            </h2>

            <p className="text-gray-500 mb-8">
              Continue with your Google account
            </p>

            <button
              onClick={login}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-3 hover:bg-gray-100 transition duration-200 shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}


  /* ================= DASHBOARD UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-blue-300">
  
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-400 to-blue-400 text-white px-10 py-4 flex justify-between items-center shadow-lg">

{/* Title */}
<h1 className="text-2xl font-bold tracking-wide">
  Smart Bookmark
</h1>

{/* Logout Button */}
<button
  onClick={logout}
  className="bg-red-500 hover:bg-red-600 transition px-8 py-2 rounded-xl shadow-md font-medium"
>
  Logout
</button>

</nav>

  
      {/* ================= CONTENT ================= */}
      <div className="p-10 max-w-6xl mx-auto">
  
        {/* Add Bookmark Card */}
        <form
  onSubmit={(e) => {
    e.preventDefault();   // page reload nahi hoga
    addBookmark();        // bookmark add karega
  }}
  className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/40 mb-10"
>


  <div className="grid md:grid-cols-2 gap-6">
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Bookmark Title"
      className="bg-white/80 text-gray-800 placeholder-gray-500 rounded-xl p-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
    />

    <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="https://example.com"
      className="bg-white/80 text-gray-800 placeholder-gray-500 rounded-xl p-4 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
    />
  </div>

  <button
    type="submit"
    className="mt-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-8 py-3 rounded-xl shadow-md hover:scale-105 transition duration-200"
  >
    Add Bookmark
  </button>
  </form>




  
        {/* Folder Gradients */}
        {(() => {
  const folderGradients = [
    "from-blue-500 to-indigo-600",
    "from-purple-500 to-pink-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
    "from-rose-500 to-red-500",
    "from-cyan-500 to-blue-500",
  ];

  if (bookmarks.length === 0) {
    return (
      <div className="text-center mt-20">
        <div className="text-6xl mb-4">📂</div>
        <p className="text-gray-700 text-xl font-semibold">
          No bookmarks yet
        </p>
        <p className="text-gray-500">
          Start by adding your first bookmark 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {bookmarks.map((b, index) => (
        <div
          key={b.id}
          className={`relative bg-gradient-to-br ${
            folderGradients[index % folderGradients.length]
          } text-white rounded-3xl p-6 shadow-xl hover:-translate-y-1 hover:scale-105 transition duration-300 cursor-pointer`}
        >

          {/* Folder Tab */}
          <div className="absolute -top-3 left-10 w-20 h-6 rounded-t-xl bg-white/30 shadow-sm border border-white/30"></div>

          <h2 className="text-xl font-semibold mb-4">
            {b.title}
          </h2>

          <div className="flex justify-between items-center">
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline"
            >
              Open
            </a>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-white/80 hover:text-white transition"
            >
              Delete
            </button>
          </div>

        </div>
      ))}
    </div>
  );
})()}

  
      </div>
    </div>
  )
  
  
  
}
