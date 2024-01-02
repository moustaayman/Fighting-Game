package com.example.fightinggame;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        List<Character> characters = new ArrayList<>();
        characters.add(new Knight("knight", 100));
        characters.add(new Wizard("wizard", 150, 100));
        characters.add(new Enemy("enemy", 50, Loot.POTION));

        Scanner scanner = new Scanner(System.in);
        int round = 0;

        while (hasPlayerAlive(characters) && characters.get(2).isAlive()) {
            System.out.println("Round number : "+round);
            displayGameState(characters);
            System.out.println("Press Enter to play the next turn...");
            scanner.nextLine();


            for (Character character : characters) {
                if (character.isAlive()) {
                    character.attack(characters.get(2)); // Attaquer l'ennemi
                    if (characters.get(2).isAlive()) {
                        characters.get(2).attack(character); // L'ennemi attaque à son tour
                    }
                }
            }
            round++;
        }

        // Filtrer les joueurs uniquement
        List<Player> players = new ArrayList<>();
        for (Character character : characters) {
            if (character instanceof Player) {
                players.add((Player) character);
            }
        }

        // Trier la liste de joueurs par ordre décroissant de points de vie
        Collections.sort(players);

        System.out.println("Round number : "+round);
        displayGameState(characters);
        System.out.println("Game Over");
    }

    private static boolean hasPlayerAlive(List<Character> characters) {
        for (Character character : characters) {
            if (character.isAlive()) {
                return true;
            }
        }
        return false;
    }

    private static void displayGameState(List<Character> characters) {
        for (Character character : characters) {
            System.out.println(character);
        }
        System.out.println("---------------");
    }
}