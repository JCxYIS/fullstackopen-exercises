namespace bloglist_fullstack.Utilities
{
    public static class EnvHelper
    {
        /// <summary>
        /// Load all *.env files into Enviroment Variables
        /// </summary>
        /// <param name="dirPath">Default: Project root</param>
        public static void LoadAllEnv(string dirPath = "")
        {
            if (dirPath == "")
                //dirPath = AppDomain.CurrentDomain.BaseDirectory; // Exe Dir
                dirPath = Directory.GetCurrentDirectory(); // Project Root

            if (!Directory.Exists(dirPath))
                throw new DirectoryNotFoundException(dirPath);

            foreach (string filePath in Directory.GetFiles(dirPath, "*.env"))
            {
                //int envCount = 0;
                foreach (var line in File.ReadAllLines(filePath))
                {
                    var eqIndex = line.IndexOf('=');
                    if (eqIndex == -1)
                        continue;
                    Environment.SetEnvironmentVariable(
                        line[0..eqIndex],
                        line[(eqIndex+1)..line.Length]);
                    //envCount++;
                }
                //Console.WriteLine($"Append {envCount} envs from {filePath}");
            }
            
        }
    }
}
