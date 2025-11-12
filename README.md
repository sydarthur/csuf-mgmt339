# CSUF MGMT 339 - Course Materials

This repository contains interactive course materials for MGMT 339 at California State University, Fullerton.

## Project Structure

- **slides/** - Course presentation slides using Reveal.js
- **tools/spc/** - Statistical Process Control (SPC) interactive tool
- **tools/viz/** - Visualization utilities for inventory and queuing systems

## Features

- Interactive SPC (Statistical Process Control) tool with real-time charting
- Course slides with embedded video content
- Python-based visualization tools for operations management concepts
- GitHub Pages deployment for easy access

## Development

### Prerequisites

- Node.js and npm
- Python 3.x (for visualization tools)

### Installation

```bash
# Install Node.js dependencies
npm install

# Set up Python virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Development Commands

```bash
# Run SPC tool in development mode
npm run dev

# Run slides in development mode
npm run dev:slides

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Project Components

### SPC Tool
Interactive Statistical Process Control tool for quality management analysis, featuring:
- Real-time chart generation
- Video summaries and learning resources
- Student-focused interface

### Course Slides
Reveal.js-based presentation materials with:
- Embedded video content
- Interactive examples
- Modern, responsive design

### Visualization Tools
Python scripts for generating visualizations of:
- Inventory management systems
- Queuing theory concepts
- Operations management models

## Technology Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Presentations**: Reveal.js
- **Deployment**: GitHub Pages

## License

This project is for educational purposes.

## AI Assistance

This project was developed with assistance from Claude (Anthropic AI).
