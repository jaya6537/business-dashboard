# GrowthProAI Mini Local Business Dashboard

A full-stack web application that simulates how small businesses might view their SEO content and Google Business data. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- **Business Information Form**: Input business name and location
- **Simulated Google Business Data**: Display rating, reviews, and AI-generated SEO headlines
- **Dynamic Headline Generation**: Regenerate SEO headlines with AI-style suggestions
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Loading States**: Visual feedback during API calls
- **Form Validation**: Client-side validation for required fields
- **Modern UI**: Clean, professional design with shadcn/ui components

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Lucide React** for icons

### Backend
- **Next.js API Routes** (serverless functions)
- **TypeScript** for type safety
- **Simulated data** (no database required)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd business-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
business-dashboard/
├── app/
│   ├── api/
│   │   ├── business-data/
│   │   │   └── route.ts          # POST endpoint for business data
│   │   └── regenerate-headline/
│   │       └── route.ts          # GET endpoint for headline regeneration
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main dashboard page
├── components/
│   └── ui/                       # shadcn/ui components
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── README.md
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
\`\`\`

## API Endpoints

### POST /api/business-data
Accepts business information and returns simulated Google Business data.

**Request Body:**
\`\`\`json
{
  "name": "Cake & Co",
  "location": "Mumbai"
}
\`\`\`

**Response:**
\`\`\`json
{
  "rating": 4.3,
  "reviews": 127,
  "headline": "Why Cake & Co is Mumbai's Sweetest Spot in 2024"
}
\`\`\`

### GET /api/regenerate-headline
Generates a new AI-style SEO headline for the business.

**Query Parameters:**
- `name`: Business name
- `location`: Business location

**Response:**
\`\`\`json
{
  "headline": "Cake & Co: The Mumbai Success Story Everyone's Talking About"
}
\`\`\`

## Features Implemented

### Core Requirements ✅
- [x] Responsive dashboard with React and Tailwind CSS
- [x] Business name and location input form
- [x] Display card with simulated Google rating and reviews
- [x] AI-generated SEO headline display
- [x] "Regenerate SEO Headline" functionality
- [x] POST /business-data endpoint
- [x] GET /regenerate-headline endpoint
- [x] Mobile-friendly responsive design

### Bonus Features ✅
- [x] Loading spinners and transitions
- [x] Form validation with error messages
- [x] TypeScript for type safety
- [x] Modern UI with shadcn/ui components
- [x] Professional styling and animations
- [x] SEO-optimized metadata

## Usage

1. **Enter Business Information**
   - Fill in your business name (e.g., "Cake & Co")
   - Enter your location (e.g., "Mumbai")
   - Click "Get Business Insights"

2. **View Business Dashboard**
   - See your simulated Google rating and review count
   - Read your AI-generated SEO headline
   - Click "Regenerate SEO Headline" for new suggestions

## Deployment

This application can be easily deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Render**

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

## Development Notes

- All data is simulated - no database required
- Headlines are generated from predefined templates
- Rating and review counts are randomly generated within realistic ranges
- CORS is handled automatically by Next.js API routes
- TypeScript ensures type safety across the application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for the GrowthProAI Full Stack Intern Assignment.
