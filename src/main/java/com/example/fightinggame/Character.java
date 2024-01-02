package com.example.fightinggame;

abstract class Character implements Comparable<Character> {
    private final String name;
    private int pv;

    public Character(String name, int pv) {
        if (pv < 0) {
            throw new IllegalStateException("PV ne peut pas être inférieur à 0.");
        }
        this.name = name;
        this.pv = pv;
    }

    public abstract void attack(Character target);

    public boolean isAlive() {
        return pv > 0;
    }

    public void takeDamage(int damage) {
        pv -= damage;
    }
    public int compareTo(Character other) {
        // Tri par ordre décroissant de PV
        return Integer.compare(other.getPv(), this.getPv());
    }
    public String getName() {
        return name;
    }
    public int getPv() {
        return pv;
    }
    public void setPv(int pv) {
        if (pv < 0) {
            throw new IllegalStateException("PV ne peut pas être inférieur à 0.");
        }
        this.pv = pv;
    }
    public String toString() {
        return "Character{name='" + name + "', pv=" + pv + '}';
    }
}