package org.alten.back.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.alten.back.entity.Produit;
import org.alten.back.service.ProduitService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private ProduitService produitService;

    public DataInitializer(ProduitService produitService) {
        this.produitService = produitService;
    }

    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream inputStream = new ClassPathResource("products.json").getInputStream();
        List<Produit> produits = mapper.readValue(inputStream, new TypeReference<List<Produit>>() {});

        if (produitService.getAllProducts().isEmpty()) {
            produitService.saveAll(produits);
            System.out.println("Products loaded from JSON and saved to the database.");
        }
    }
}
