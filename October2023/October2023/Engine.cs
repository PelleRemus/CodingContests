using System.Collections.Generic;
using System.Linq;

namespace October2023
{
    public static class Engine
    {
        public static string baseFile;
        public static int level;
        public static string fileContent;
        public static List<string> commands;

        public static void Init(int lvl, string part)
        {
            level = lvl;
            baseFile = $"../../../files/level{level}/level{level}_";

            fileContent = Caroshark.File.GetFullContent($"{baseFile}{part}.in");
            commands = fileContent.Replace("\n", " ").Replace("\r", "").Split(' ').ToList();
            commands.RemoveAll(x => x == "");
        }

        public static void Level1(string part, bool writeToFile = true)
        {
            Init(1, part);

            if (writeToFile)
                Caroshark.File.WriteFullContent($"{baseFile}{part}.out", "");
            else
                Caroshark.Printer.Print("");
        }
    }
}
