package org.alten.back.service;

import org.alten.back.entity.Produit;
import org.alten.back.repository.ProduitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    private ProduitRepository produitRepository;

    public ProduitService(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    public Produit saveProduct(Produit produit) {
        return produitRepository.save(produit);
    }

    public void saveAll(List<Produit> produits) {
        produitRepository.saveAll(produits);
    }

    public List<Produit> getAllProducts() {
        return produitRepository.findAll();
    }

    public Produit getProductById(Long id) {
        Optional<Produit> product = produitRepository.findById(id);
        return product.orElse(null);
    }

    public Produit updateProduct(Long id, Produit product) {
        if (produitRepository.existsById(id)) {
            product.setId(id);
            return produitRepository.save(product);
        }
        return null;
    }

    public void deleteProduct(Long id) {

        produitRepository.deleteById(id);
        produitRepository.findAll();
    }

    public boolean existsById(Long id) {
        return produitRepository.existsById(id);
    }
}