package com.example.fightinggame;

public class Wizard extends Player {
    private int mp;

    public int getMp() {
        return mp;
    }

    public void setMp(int mp) {
        this.mp = mp;
    }

    public Wizard(String name, int pv, int pm) {
        super(name, pv);
        this.mp = pm;
    }

    @Override
    public void attack(Character target) {
        if (mp >= 10) {
            target.takeDamage(10);
            increaseExperience(10);
            mp -= 10;
        }
    }

    @Override
    public String toString() {
        return "Wizard{name='" + getName() + "', pv=" + getPv() + ", experience=" + getExperience() + ", pm=" + mp + '}';
    }
}