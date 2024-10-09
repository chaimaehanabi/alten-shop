package org.alten.back.controller;

import org.alten.back.entity.Produit;
import org.alten.back.service.ProduitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:51440")
public class ProduitController {
    private ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    @GetMapping
    public List<Produit> getAllProducts() {
        return produitService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Produit getProductById(@PathVariable Long id) {
        return produitService.getProductById(id);
    }

    @PostMapping
    public Produit createProduct(@RequestBody Produit product) {
        return produitService.saveProduct(product);
    }

    @PutMapping("/{id}")
    public Produit updateProduct(@PathVariable Long id, @RequestBody Produit productDetails) {
        Produit existingProduct = produitService.getProductById(id);
        if (existingProduct != null) {
            existingProduct.setCode(productDetails.getCode());
            existingProduct.setName(productDetails.getName());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setQuantity(productDetails.getQuantity());
            existingProduct.setCategory(productDetails.getCategory());
            existingProduct.setInventoryStatus(productDetails.getInventoryStatus());
            return produitService.saveProduct(existingProduct);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        if (!produitService.existsById(id)) {
            return ResponseEntity.status(404).body("Produit non trouvé " + id );
        }

        produitService.deleteProduct(id);
        return ResponseEntity.ok("Produit supprimé  " + id + " avec succès") ;
    }
}