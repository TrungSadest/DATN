package com.shonline.entity.id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDiscountsId implements Serializable {
    private Integer productId;
    private Integer discountId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductDiscountsId that = (ProductDiscountsId) o;
        return Objects.equals(productId, that.productId) &&
                Objects.equals(discountId, that.discountId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, discountId);
    }
}
