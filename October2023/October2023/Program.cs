using System;

namespace October2023
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Engine.Level1("example", false);
            for (int i = 1; i <= 5; i++)
                Engine.Level1(i.ToString());

            Console.WriteLine("finished");
            Console.ReadLine();
        }
    }
}
