"use client";

import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useImageGeneration } from "../hooks/useImageGeneration";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [enhance, setEnhance] = useState(false);
  const [steps, setSteps] = useState(50);
  const { generateImage, image, loading, error } = useImageGeneration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateImage(prompt, width, height, enhance, steps);
  };

  const handleReset = () => {
    setPrompt("");
    setWidth(512);
    setHeight(512);
    setEnhance(false);
    setSteps(50);
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-gray-700"
          >
            Prompt
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="width"
              className="block text-sm font-medium text-gray-700"
            >
              Width
            </label>
            <input
              type="number"
              id="width"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              min="64"
              max="1024"
              step="64"
              required
            />
          </div>
          <div>
            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700"
            >
              Height
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              min="64"
              max="1024"
              step="64"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="steps"
            className="block text-sm font-medium text-gray-700"
          >
            Steps
          </label>
          <input
            type="number"
            id="steps"
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            min="1"
            max="150"
            required
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enhance"
            checked={enhance}
            onChange={(e) => setEnhance(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="enhance" className="ml-2 block text-sm text-gray-900">
            Enhance
          </label>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Reset
          </button>
        </div>
      </form>
      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {image && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Image</h2>
          <img
            src={image}
            alt="Generated"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
