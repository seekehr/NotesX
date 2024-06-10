import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';


export default function Component() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: [],
  })
  const [tags, setTags] = useState([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredNote, setHoveredNote] = useState([])
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [fullscreenNote, setFullscreenNote] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleNoteCreate = () => {
    const newTags = newNote.tags.filter((tag) => !tags.includes(tag))
    setTags([...tags, ...newTags])
    setNotes([...notes, { ...newNote, id: notes.length + 1 }])
    setNewNote({ title: "", content: "", tags: [] })
  }

  const handleNoteEdit = (id, updates) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updates } : note)))
  }

  const handleNoteDelete = (id) => {
    const deletedNote = notes.find((note) => note.id === id)
    const updatedTags = tags.filter((tag) => !deletedNote.tags.includes(tag))
    setTags(updatedTags)
    setNotes(notes.filter((note) => note.id !== id))
  }

  const handleFullscreenOpen = (note) => {
    setFullscreenNote(note)
    setIsFullscreenOpen(true)
  }

  const handleFullscreenClose = () => {
    setIsFullscreenOpen(false)
    setFullscreenNote(null)
  }

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleFullscreenSave = () => {
    handleNoteEdit(fullscreenNote.id, {
      title: fullscreenNote.title,
      content: fullscreenNote.content,
    })
  }

  const filteredNotes =
    activeCategory === "all"
      ? notes.filter((note) => note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      : notes.filter(
          (note) =>
            note.tags.includes(activeCategory) &&
            note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
        )
  return (
    <div className={`flex h-screen w-full flex-col ${isDarkMode ? "dark" : ""}`}>
      <header className="bg-gray-800 py-4 px-6 text-white flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Notes
          <span className="animate-pulse space-x-4">X</span>
        </h1>
        <div className="flex items-center gap-4">
          <form className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search by tag..."
              className={`pl-8 w-[200px] sm:w-[300px] font-normal ${isDarkMode ? "text-white" : "text-gray-800"}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:focus:ring-gray-400"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleDarkModeToggle}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:focus:ring-gray-400"
          >
            <SunMoonIcon className="h-6 w-6" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        {!isCollapsed && (
          <nav className={`bg-white p-6 dark:bg-gray-600 ${isDarkMode ? "dark:text-white" : "dark:text-gray-200"}`}>
            <h2 className={`mb-4 text-lg font-bold ${isDarkMode ? "dark:text-white" : ""}`}>Tags</h2>
            <ul className="space-y-2">
              <li>
                <button
                  className={`block w-full rounded-md px-4 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-500 ${
                    activeCategory === "all" ? "bg-gray-100 dark:bg-gray-500" : ""
                  }`}
                  onClick={() => setActiveCategory("all")}
                >
                  <span className={isDarkMode ? "text-white" : "text-gray-800"}>All</span>
                </button>
              </li>
              {tags.map((tag) => (
                <span>
                  <li>
                    <button
                      className={`block w-full rounded-md px-4 py-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-500 ${
                        activeCategory === tag ? "bg-gray-100 dark:bg-gray-500" : ""
                      }`}
                      onClick={() => setActiveCategory(tag)}
                    >
                      <span className={isDarkMode ? "text-white" : "text-gray-800"}>{tag}</span>
                    </button>
                  </li>
                </span>
              ))}
            </ul>
          </nav>
        )}
        <main
          className={`flex-1 p-6 overflow-y-auto ${
            isDarkMode ? "bg-gray-700 dark:text-white" : "bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : ""}`}>Notes</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredNotes.map((note) => (
              <Card
                key={note.id}
                onMouseEnter={() => setHoveredNote(note.id)}
                onMouseLeave={() => setHoveredNote(null)}
                className={`${
                  hoveredNote === note.id ? "shadow-lg" : ""
                } transition-all duration-300 ease-in-out transform hover:-translate-y-2 relative ${
                  isDarkMode ? "bg-gray-600 text-white" : "bg-white dark:bg-gray-600 dark:text-white"
                }`}
                style={{ minHeight: `${note.title.length > 20 ? "200px" : "150px"}` }}
              >
                <CardHeader>
                  <CardTitle className="text-ellipsis overflow-hidden whitespace-nowrap font-bold">
                    <span className={isDarkMode ? "text-white" : "text-gray-800"}>{note.title}</span>
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className={`${
                          isDarkMode
                            ? "bg-gray-500 text-white"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-500 dark:text-gray-200"
                        }`}
                      >
                        <span className={isDarkMode ? "text-white" : "text-gray-800"}>{tag}</span>
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={isDarkMode ? "text-white" : "text-gray-800"}>{note.content}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 left-2"
                      onClick={() => handleNoteDelete(note.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span className="sr-only">Delete note</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 right-2"
                      onClick={() => handleFullscreenOpen(note)}
                    >
                      <ExpandIcon className="h-4 w-4" />
                      <span className="sr-only">Open fullscreen</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Card className={`${isDarkMode ? "bg-gray-600 text-white" : "bg-white dark:bg-gray-600 dark:text-white"}`}>
              <CardHeader>
                <CardTitle className="font-bold">
                  <span className={isDarkMode ? "text-white" : "text-gray-800"}>Create New Note</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className={`font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className={`${
                      isDarkMode ? "bg-gray-500 text-white" : "bg-gray-50 dark:bg-gray-500 dark:text-white"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content" className={`font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    className={`h-32 overflow-y-auto ${
                      isDarkMode ? "bg-gray-500 text-white" : "bg-gray-50 dark:bg-gray-500 dark:text-white"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className={`font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    value={newNote.tags.join(", ")}
                    onChange={(e) =>
                      setNewNote({
                        ...newNote,
                        tags: e.target.value.slice(0, 30).split(", "),
                      })
                    }
                    maxLength={30}
                    className={`${
                      isDarkMode ? "bg-gray-500 text-white" : "bg-gray-50 dark:bg-gray-500 dark:text-white"
                    }`}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end">
                  <Button
                    onClick={handleNoteCreate}
                    className={`${
                      isDarkMode
                        ? "bg-gray-500 text-white hover:bg-gray-400"
                        : "bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-400"
                    }`}
                  >
                    Create Note
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div
            className={`bg-white dark:bg-gray-600 rounded-lg shadow-lg w-[90vw] max-w-[1200px] h-[90vh] p-6 relative overflow-y-auto ${
              isDarkMode ? "text-white" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                className={`${
                  isDarkMode
                    ? "text-white hover:bg-gray-500"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500"
                }`}
                onClick={handleFullscreenClose}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close fullscreen</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  handleNoteEdit(fullscreenNote.id, {
                    title: fullscreenNote.title,
                    content: fullscreenNote.content,
                  })
                }
              >
                <FilePenIcon className="h-4 w-4" />
                <span className="sr-only">Edit note</span>
              </Button>
            </div>
            <div className="h-full flex flex-col gap-4">
              <div className="space-y-2">
                <Label className={`text-lg font-bold ${isDarkMode ? "text-white" : ""}`}>Title</Label>
                <Input
                  id="title"
                  value={fullscreenNote.title}
                  onChange={(e) => setFullscreenNote({
                    ...fullscreenNote,
                    title: e.target.value
                  })}
                  className={`${
                    isDarkMode ? "bg-gray-500 text-white" : "bg-gray-50 dark:bg-gray-500 dark:text-white"
                  } text-2xl font-bold`}
                  maxLength={70}
                />
              </div>
              <div className="text-gray-500">
                <p> {fullscreenNote.title.length + "/" + 70} </p>
              </div>
              <div className="flex-1">
                <Label htmlFor="content" className={`text-lg font-bold ${isDarkMode ? "text-white" : ""}`}>
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={fullscreenNote.content}
                  onChange={(e) => setFullscreenNote({
                    ...fullscreenNote,
                    content: e.target.value
                  })}
                  className={`h-full overflow-y-auto ${
                    isDarkMode ? "bg-gray-500 text-white" : "bg-gray-50 dark:bg-gray-500 dark:text-white"
                  } text-lg`}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleFullscreenSave}
                  className={`${
                    isDarkMode
                      ? "bg-gray-500 text-white hover:bg-gray-400"
                      : "bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-500 dark:text-white dark:hover:bg-gray-400"
                  }`}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ExpandIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </svg>
  )
}


function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function SunMoonIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.3 17.7-1.4 1.4" />
      <path d="m19.1 4.9-1.4 1.4" />
    </svg>
  )
}


function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}