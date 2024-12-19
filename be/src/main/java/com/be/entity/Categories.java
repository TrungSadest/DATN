package com.be.entity;

import javax.persistence.*;

@Entity
@Table(name = "categories")
public class Categories {
    @Id
    @Column(name = "category_id")
    private String categoryId;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "is_del")
    private Boolean isDel;

    @PrePersist
    public void generateId() {
        if (this.categoryId == null) {
            this.categoryId = "C-" + System.currentTimeMillis();
        }
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Boolean getDel() {
        return isDel;
    }

    public void setDel(Boolean del) {
        isDel = del;
    }
}
