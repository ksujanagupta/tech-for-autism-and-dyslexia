import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Initialize configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Get file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, 'data.json');

// Load data from JSON file
let mappingData;
try {
  const jsonData = fs.readFileSync(dataPath, 'utf8');
  mappingData = JSON.parse(jsonData);
  console.log('Data loaded successfully from JSON file');
} catch (error) {
  console.error('Error loading JSON data:', error);
  mappingData = [];
}

// API endpoint to get TQ score
app.get('/getTQScore', (req, res) => {
  try {
    const { age, section, name, raw_score } = req.query;
    
    if (!age || !section || !name || !raw_score) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Parse the raw score to a number
    const parsedRawScore = parseInt(raw_score, 10);
    
    // Find the mapping document that matches the criteria
    const mapping = mappingData.find(m => 
      m.age === parseInt(age, 10) &&
      m.section.toLowerCase() === section.toLowerCase() &&
      m.name.toLowerCase().startsWith(name.toLowerCase())
    );
    
    if (!mapping) {
      return res.status(404).json({ error: 'No mapping found for given criteria' });
    }
    
    // Find the appropriate tq_score for the given raw_score
    const scoreMapping = mapping.mappings.find(m => m.raw_score === parsedRawScore);
    
    if (!scoreMapping) {
      return res.status(404).json({ error: 'No TQ score found for given raw score' });
    }
    
    return res.json({ tq_score: scoreMapping.tq_score });
    
  } catch (error) {
    console.error('Error fetching TQ score:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});