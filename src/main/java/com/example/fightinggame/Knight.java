package com.example.fightinggame;

public class Knight extends Player {

    public Knight(String name, int pv) {
        super(name, pv);
    }
    @Override
    public void attack(Character target) {
        target.takeDamage(10);
        increaseExperience(10);
    }

    @Override
    public String toString() {
        return "Knight{name='" + getName() + "', pv=" + getPv() + ", experience=" + getExperience() + '}';
    }
}