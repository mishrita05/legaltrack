import fs from "fs"
import path from "path"
import axios from "axios"

async function setupModel() {
  console.log("Setting up IPC prediction model and dataset...")

  const scriptsDir = path.join(process.cwd(), "scripts")
  const datasetUrl =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ipc_sec_dataset-BR2w7bs0WqyH1HP7XkmP55TpWCxVzf.csv"
  const datasetPath = path.join(process.cwd(), "ipc_sec_dataset.csv")

  // Create scripts directory if it doesn't exist
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true })
  }

  // Download the dataset
  try {
    console.log("Downloading dataset...")
    const response = await axios.get(datasetUrl, { responseType: "stream" })
    const writer = fs.createWriteStream(datasetPath)

    response.data.pipe(writer)

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve)
      writer.on("error", reject)
    })

    console.log("Dataset downloaded successfully!")
  } catch (error) {
    console.error("Error downloading dataset:", error)
  }

  console.log("Setup complete!")
}

setupModel().catch(console.error)

