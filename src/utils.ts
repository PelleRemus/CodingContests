export function generateLawnFromPath(path: string) {
    let lawn = [[1]];
    let x = 0, y = 0;
    for (let dir of path) {
        switch (dir) {
            case 'D':
                x++;
                if(lawn[y].length <= x)
                    lawn.forEach(line => line.push(0));
                break;
            case 'S':
                y++;
                break;
            case 'A':
                x--;
                break;
            case 'W':
                y--;
                break;
        }
        lawn[x][y] = 1;
        console.log(lawn);
    }
}