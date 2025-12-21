# CapCap - Caption Review & Editing Tool

A specialized web application for reviewing and editing image captions in educational datasets. Built with Astro and Supabase, this tool provides an intuitive interface for annotating textbook images with quality captions.

## 🎯 Features

- **Two Viewing Modes**
  - **Random Mode**: Weighted random selection prioritizing high-priority items (50% high, 33% normal, 17% low)
  - **Sequential Mode**: Navigate through items in sorted order with keyboard shortcuts (←/→)

- **Dual Caption Editor**
  - **Caption Short**: Concise image description
  - **Caption Detail**: Comprehensive, detailed caption
  - Read-only mode with easy edit toggle
  - Auto-expanding textareas with change tracking

- **Smart Filtering**
  - Filter by book/dataset scope (10 Vietnamese textbooks)
  - Filter by review priority (high/normal/low)
  - Filter by status (unchecked/checked/reviewed)
  - Search by ID for quick access

- **Comprehensive Annotation Interface**
  - Page type classification (cover, content, exercise, etc.)
  - Text and table detection
  - Objects present tagging (40+ categories)
  - Error tags (OCR issues, hallucinations, counting errors, etc.)
  - Auto-flags verification
  - Notes and change log tracking

- **Progress Tracking**
  - Real-time progress bar showing completion percentage
  - Checkpoint system for filtered datasets
  - Visual feedback with status badges

- **Responsive Split-View Layout**
  - Resizable panels (horizontal and vertical)
  - Image viewer with optimal scaling
  - Fixed caption editor for easy access
  - Scrollable annotation form

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.com/) (recommended) or Node.js 18+
- Supabase account with configured database

### Installation

```bash
# Clone the repository
git clone git@github.com:itshoang2024/capcap.git
cd capcap

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Database Schema

The application expects a `dataset` table in Supabase with the following structure:

- `id` (text, primary key) - Image identifier
- `page_type` (enum) - Page classification
- `has_text` (boolean) - Text presence indicator
- `has_table` (boolean) - Table presence indicator
- `objects_present` (text[]) - Array of detected objects
- `error_tags` (text[]) - Quality issues
- `auto_flags` (text[]) - Automated quality flags
- `caption_short` (text) - Short caption
- `caption_detail` (text) - Detailed caption
- `text_in_image` (text) - OCR text verification
- `notes` (text) - Reviewer notes
- `change_log` (text) - Edit history
- `review_priority` (enum: low/normal/high)
- `is_checked` (enum: unchecked/checked/reviewed)

Images should be stored in Supabase Storage at `images/<id>.png`.

### Development

```bash
# Start development server
bun dev
# App will be available at http://localhost:4321
```

### Build & Deploy

```bash
# Build for production
bun build

# Preview production build
bun preview
```

The app is configured for Netlify deployment via `netlify.toml`.

## 📚 Supported Datasets

Currently configured for 10 Vietnamese elementary textbooks (Sách Giáo Khoa Cánh Diều):

- Đạo Đức (Grades 1-3)
- Tiếng Việt (Grade 2, Volumes 1-2)
- Toán (Grades 1, 3)
- Tự Nhiên Và Xã Hội (Grades 1-3)

## 🎨 Technology Stack

- **Frontend**: [Astro](https://astro.build/) - Modern web framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Database**: [Supabase](https://supabase.com/) - PostgreSQL + Storage
- **Deployment**: [Netlify](https://netlify.com/)
- **Runtime**: [Bun](https://bun.sh/) (recommended)

## 🎮 Keyboard Shortcuts

- **← (Left Arrow)**: Previous item (Sequential mode)
- **→ (Right Arrow)**: Next item (Sequential mode)
- **Enter** in search: Jump to ID
- **C**: Confirm "Yes" in questions
- **K**: Select "No" in questions
- **S**: Skip question

## 🔄 Workflow

1. **Select Filters**: Choose book scope, priority, and status
2. **Review Image**: Examine the textbook page
3. **Edit Captions**: Click "Edit" to modify short/detail captions
4. **Annotate**: Answer questions and add tags
5. **Save**: Submit to mark as checked and move to next item

In Sequential mode with unchecked filter, saving automatically advances to the next unchecked item.

## 📝 Development Notes

- Server-side rendering with Astro for fast initial loads
- View Transitions API for smooth navigation
- Optimistic image preloading for next/previous items
- Client-side state persistence via cookies
- Auto-expanding textareas for better UX

## 📄 License

[Add your license here]

## 🤝 Contributing

[Add contribution guidelines if applicable]
