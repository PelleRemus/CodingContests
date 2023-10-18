using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace October2023
{
    public class Caroshark
    {
        public static class File
        {
            public static List<string> GetAsList(string path)
            {
                TextReader reader = new StreamReader(path);
                List<string> list = new List<string>();

                string buffer;
                while ((buffer = reader.ReadLine()) != null)
                    list.Add(buffer);

                reader.Close();
                return list;
            }
            public static string GetFullContent(string path)
            {
                TextReader reader = new StreamReader(path);
                string str = reader.ReadToEnd();

                reader.Close();
                return str;
            }

            public static void WriteFullContent(string path, string content)
            {
                TextWriter writer = new StreamWriter(path);
                writer.Write(content);

                writer.Close();
            }
            public static void WriteList(string path, IEnumerable content)
            {
                TextWriter writer = new StreamWriter(path);
                foreach (object item in content)
                    writer.WriteLine(item.ToString());

                writer.Close();
            }
        }

        public static class Printer
        {
            public static void Print(object a)
            {
                if (a is IEnumerable[])
                    PrintMatrix(a as IEnumerable[]);
                else if (a is IEnumerable && !(a is string))
                    PrintVector(a as IEnumerable);
                else
                {
                    Console.WriteLine(a.ToString());
                    Console.WriteLine();
                }
            }

            public static void PrintVector(IEnumerable v)
            {
                StringBuilder str = new StringBuilder();

                foreach (object item in v)
                    str.Append(item.ToString() + ", ");
                str.Remove(str.Length - 2, 2);

                Console.WriteLine(str.ToString());
                Console.WriteLine();
            }

            public static void PrintMatrix(IEnumerable[] v)
            {
                StringBuilder str = new StringBuilder();

                foreach (IEnumerable item in v)
                {
                    str.AppendLine();
                    foreach (object item2 in item)
                        str.Append(item2.ToString() + ", ");
                }
                str.Remove(str.Length - 2, 2);

                Console.WriteLine(str.ToString());
                Console.WriteLine();
            }
        }
    }
}
