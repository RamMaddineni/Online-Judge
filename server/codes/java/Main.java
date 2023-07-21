import java.io.*;
import java.util.*;
import java.lang.*;

public class Main {
    static boolean visit;
    static int INT_MAX = 1000000;
    static int n,m;
    static char[][] maze;
    public static void main(String[] args) throws IOException {
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        Scanner sc = new Scanner(System.in);
        n  = sc.nextInt();
        m  = sc.nextInt();
        sc.nextLine();
        maze = new char[n][m];
        int entryX = -1, entryY = -1;
        for(int i = 0; i < n ; i++){
            String k = sc.hasNextLine() ? sc.nextLine() : repeatCharacter('0', m);
            for(int j = 0; j < m ; j++){
                maze[i][j] = k.charAt(j);
                if(maze[i][j] == '@'){
                    entryX=i;
                    entryY=j;
                }
            }
        }
        int ans = sol(new Pair(entryX,entryY),new Pair(-1,-1),new boolean[n][m]);
        if(visit){
            bw.write(String.valueOf(ans == INT_MAX ? -1 : ans));
        }
        else{
            bw.write("-1");
        }
        bw.flush();
    }

    static String repeatCharacter(char c, int count) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < count; i++) {
            sb.append(c);
        }
        return sb.toString();
    }
    static int sol(Pair curr, Pair prev, boolean[][] visited){
        if(curr.x<0 || curr.x>=n || curr.y<0 || curr.y>=m){
            return INT_MAX;
        }
        if(maze[curr.x][curr.y] == '0'){
            return INT_MAX;
        }
        if(maze[curr.x][curr.y] == '#'){
            visit = true;
            return 0;
        }
        if(visited[curr.x][curr.y]){
            return INT_MAX;
        }
        visited[curr.x][curr.y] = true;
        if(maze[curr.x][curr.y] == '.' || maze[curr.x][curr.y] == '@'){
            int min = INT_MAX;
            min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
            min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
            min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
            min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
            visited[curr.x][curr.y] = false;
            return min == INT_MAX ? INT_MAX : min + 1;
        }
        if(maze[curr.x][curr.y] == '1'){
            if(maze[prev.x][prev.y] == '.' || maze[prev.x][prev.y] == '@'){
                if(prev.x==curr.x){
                    if(prev.y>curr.y){
                        if(curr.y==0){
                            int min = INT_MAX;
                            min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                            visited[curr.x][curr.y] = false;
                            return min == INT_MAX ? INT_MAX : min + 1;
                        }
                        if(maze[curr.x][curr.y-1] == '0'){
                            int min = INT_MAX;
                            min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                            visited[curr.x][curr.y] = false;
                            return min == INT_MAX ? INT_MAX : min + 1;
                        }
                        return sol(new Pair(curr.x,curr.y-1),curr,visited);
                    }
                    else{
                        if(curr.y==m){
                            int min = INT_MAX;
                            min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                            visited[curr.x][curr.y] = false;
                            return min == INT_MAX ? INT_MAX : min + 1;

                        }
                        if(maze[curr.x][curr.y+1] == '0'){
                            int min = INT_MAX;
                            min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                            visited[curr.x][curr.y] = false;
                            return min == INT_MAX ? INT_MAX : min + 1;

                        }
                        visited[curr.x][curr.y] = false;
                        return sol(new Pair(curr.x,curr.y+1),curr,visited);
                    }
                }
                else if(prev.x >curr.x){
                    if(curr.x==0){
                        int min = INT_MAX;
                        min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                        visited[curr.x][curr.y] = false;
                        return min == INT_MAX ? INT_MAX : min + 1;

                    }
                    if(maze[curr.x-1][curr.y] == '0'){
                        int min = INT_MAX;
                        min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                        visited[curr.x][curr.y] = false;
                        return min == INT_MAX ? INT_MAX : min + 1;

                    }
                    visited[curr.x][curr.y] = false;
                    return sol(new Pair(curr.x-1,curr.y),curr,visited);
                }
                else{
                    if(curr.x==n){
                        int min = INT_MAX;
                        min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                        visited[curr.x][curr.y] = false;
                        return min == INT_MAX ? INT_MAX : min + 1;
                    }
                    if(maze[curr.x+1][curr.y] == '0'){
                        int min = INT_MAX;
                        min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                        visited[curr.x][curr.y] = false;
                        return min == INT_MAX ? INT_MAX : min + 1;
                    }
                    visited[curr.x][curr.y] = false;
                    return sol(new Pair(curr.x+1,curr.y),curr,visited);
                }
            }
            else{
                if(prev.x==curr.x){
                    if(prev.y>curr.y){
                        if(curr.y==0){
                            int min = INT_MAX;
                            min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                            visited[curr.x][curr.y] = false;
                            return min == INT_MAX ? INT_MAX : min + 1;

                        }
                        if(maze[curr.x][curr.y-1] == '0'){
                            int min = INT_MAX;
                            min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                            visited[curr.x][curr.y] = false;
                            return min == INT_MAX ? INT_MAX : min + 1;

                        }
                        visited[curr.x][curr.y] = false;
                        return sol(new Pair(curr.x,curr.y-1),curr,visited);
                    }
                    else{
                        if(curr.y==m){
                            int min = INT_MAX;
                            min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                            visited[curr.x][curr.y] = false;
                            return min == INT_MAX ? INT_MAX : min + 1;

                        }
                        if(maze[curr.x][curr.y+1] == '0'){
                            int min = INT_MAX;
                            min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                            min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                            visited[curr.x][curr.y] = false;
                            return min == INT_MAX ? INT_MAX : min + 1;

                        }
                        visited[curr.x][curr.y] = false;
                        return sol(new Pair(curr.x,curr.y+1),curr,visited);
                    }
                }
                else if(prev.x >curr.x){
                    if(curr.x==0){
                        int min = INT_MAX;
                        min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                        visited[curr.x][curr.y] = false;
                        return min == INT_MAX ? INT_MAX : min + 1;

                    }
                    if(maze[curr.x-1][curr.y] == '0'){
                        int min = INT_MAX;
                        min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                        visited[curr.x][curr.y] = false;
                        return min == INT_MAX ? INT_MAX : min + 1;

                    }
                    visited[curr.x][curr.y] = false;
                    return sol(new Pair(curr.x-1,curr.y),curr,visited);
                }
                else{
                    if(curr.x==n){
                        int min = INT_MAX;
                        min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                        visited[curr.x][curr.y] = false;
                        return min == INT_MAX ? INT_MAX : min + 1;

                    }
                    if(maze[curr.x+1][curr.y] == '0'){
                        int min = INT_MAX;
                        min = Math.min(sol(new Pair(curr.x+1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x-1,curr.y),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y-1),curr,visited),min);
                        min = Math.min(sol(new Pair(curr.x,curr.y+1),curr,visited),min);
                        visited[curr.x][curr.y] = false;
                        return min == INT_MAX ? INT_MAX : min + 1;

                    }
                    visited[curr.x][curr.y] = false;
                    return sol(new Pair(curr.x+1,curr.y),curr,visited);
                }
            }
        }
        visited[curr.x][curr.y] = false;
        return -1;
    }

    static class Pair{
        int x, y;

        public Pair(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }


}