package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

import java.util.ArrayList;
import java.util.List;
import org.jboss.logging.Logger;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Recipe extends PanacheEntity {
    private static final Logger LOG = Logger.getLogger(Recipe.class);

    @Column(unique = true, nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 2)
    private Integer servings;

    @Column(nullable = true, length = 3)
    private Integer preptime;

    @Column(nullable = true, length = 200)
    private String origin_name;

    @Column(nullable = true, length = 200)
    private String origin_url;

    // @Column(nullable = true)
    // private File original;

    // @Column(nullable = true)
    // private File image;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(nullable = true)
    @JsonManagedReference("recipe-amounts")
    private List<Amount> amounts = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @Column(nullable = true)
    @JsonManagedReference("recipe-steps")
    private List<Step> steps = new ArrayList<>();

    public String getName() {
        return name;
    }

    public Integer getServings(){
        return servings;
    }

    public Integer getPreptime(){
        return preptime;
    }

    public String getOriginName(){
        return origin_name;
    }

    public String getOriginUrl(){
        return origin_url;
    }

    // public File getOriginal(){

    // }

    // public File getImage(){

    // }

    public List<Amount> getAmounts(){
        return amounts;
    }

    public List<Step> getSteps(){
        return steps;
    }

    public void setName(String name){
        LOG.info("Recipe: setting name ...");
        this.name = name;
    }

    public void setServings(Integer servings){
        if(servings < 0 || servings > 99){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 99 liegen.");
        }
        this.servings = servings;
    }

    public void setPreptime(Integer preptime){
        if(preptime < 0 || preptime > 999){
            throw new IllegalArgumentException("Wert muss zwischen 0 und 999 liegen.");
        }
        this.preptime = preptime;
    }

    public void setOriginName(String origin_name){
        this.origin_name = origin_name;
    }

    public void setOriginUrl(String origin_url){
        this.origin_url = origin_url;
    }

    // public void setOriginal(File original){

    // }

    // public void setImage(File image){

    // }

    public void setAmounts(List<Amount> newAmounts){
        LOG.info("Recipe: adding amounts ...");
        amounts = new ArrayList<>();
        for(Amount amount : newAmounts){
            LOG.info(amount.getIndex().toString());
            this.addAmount(amount);
        }
    }

    public void addAmount(Amount amount){
        amounts.add(amount);
        amount.setRecipe(this);
    }

    public void setSteps(List<Step> newSteps){
        steps = new ArrayList<>();
        for(Step step : newSteps){
            this.addStep(step);
        }
    }

    public void addStep(Step step){
        steps.add(step);
        step.setRecipe(this);
    }

    public Recipe(){
    }

    public Recipe(
        String name, 
        Integer servings, 
        Integer preptime, 
        String origin_name, 
        String origin_url,
        // File original,
        // File image,
        List<Amount> amounts,
        List<Step> steps
        ){
        this.setName(name);
        this.setServings(servings);
        this.setPreptime(preptime);
        this.setOriginName(origin_name);
        this.setOriginUrl(origin_url);
        // this.setOriginal(original);
        // this.setImage(image);
        this.setAmounts(amounts);
        this.setSteps(steps);
    }
}
