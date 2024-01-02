package com.example.fightinggame;



import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "GameServlet", value = "/GameServlet")
public class GameServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String knightName = request.getParameter("knightName");
        int knightPV = Integer.parseInt(request.getParameter("knightPV"));
        String wizardName = request.getParameter("wizardName");
        int wizardPV = Integer.parseInt(request.getParameter("wizardPV"));
        int wizardMP = Integer.parseInt(request.getParameter("wizardMP"));
        int enemyPV = Integer.parseInt(request.getParameter("enemyPV"));

        Knight knight = new Knight(knightName, knightPV);
        Wizard wizard = new Wizard(wizardName, wizardPV, wizardMP);
        Enemy enemy = new Enemy("Enemy", enemyPV, Loot.POTION);

        request.setAttribute("knight", knight);
        request.setAttribute("wizard", wizard);
        request.setAttribute("enemy", enemy);

        RequestDispatcher dispatcher = request.getRequestDispatcher("/game.jsp");
        dispatcher.forward(request, response);
    }
    private static boolean hasPlayerAlive(List<Player> players) {
        for (Player player : players) {
            if (player.isAlive()) {
                return true;
            }
        }
        return false;
    }
}
