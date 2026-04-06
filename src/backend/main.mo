import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  type Subject = {
    id : Nat;
    name : Text;
  };

  module Subject {
    public func compare(s1 : Subject, s2 : Subject) : Order.Order {
      Text.compare(s1.name, s2.name);
    };
  };

  type Quiz = {
    id : Nat;
    subjectId : Nat;
    name : Text;
    questions : [Question];
  };

  module Quiz {
    public func compare(q1 : Quiz, q2 : Quiz) : Order.Order {
      Text.compare(q1.name, q2.name);
    };
  };

  type Question = {
    id : Nat;
    questionText : Text;
    options : [Text];
    correctOption : Nat;
  };

  type Answer = {
    questionId : Nat;
    selectedOption : Nat;
  };

  type QuizResult = {
    correctCount : Nat;
    incorrectCount : Nat;
    percentage : Float;
    detailedResults : [DetailedResult];
  };

  type DetailedResult = {
    questionId : Nat;
    correctOption : Nat;
    selectedOption : Nat;
    isCorrect : Bool;
  };

  let subjects = Map.empty<Nat, Subject>();
  let quizzes = Map.empty<Nat, Quiz>();

  public query func getSubjects() : async [Subject] {
    subjects.values().toArray().sort();
  };

  public query func getSubjectQuizzes(subjectId : Nat) : async [Quiz] {
    quizzes.values().toArray().filter(
      func(q : Quiz) : Bool { q.subjectId == subjectId }
    );
  };

  public query func getQuizQuestions(quizId : Nat) : async [Question] {
    switch (quizzes.get(quizId)) {
      case (null) { Runtime.trap("Quiz not found") };
      case (?quiz) { quiz.questions };
    };
  };

  public shared ({ caller = _ }) func submitQuizAnswers(quizId : Nat, answers : [Answer]) : async QuizResult {
    switch (quizzes.get(quizId)) {
      case (null) { Runtime.trap("Quiz not found") };
      case (?quiz) {
        var correctCount = 0;
        var incorrectCount = 0;
        let detailedResults = answers.map(
          func(answer : Answer) : DetailedResult {
            let question = quiz.questions.find(
              func(q : Question) : Bool { q.id == answer.questionId }
            );
            switch (question) {
              case (null) {
                incorrectCount += 1;
                { questionId = answer.questionId; correctOption = 0; selectedOption = answer.selectedOption; isCorrect = false };
              };
              case (?q) {
                if (q.correctOption == answer.selectedOption) {
                  correctCount += 1;
                  { questionId = answer.questionId; correctOption = q.correctOption; selectedOption = answer.selectedOption; isCorrect = true };
                } else {
                  incorrectCount += 1;
                  { questionId = answer.questionId; correctOption = q.correctOption; selectedOption = answer.selectedOption; isCorrect = false };
                };
              };
            };
          }
        );
        let percentage = if (answers.size() > 0) {
          (correctCount.toFloat() / answers.size().toFloat()) * 100.0;
        } else { 0.0 };
        { correctCount; incorrectCount; percentage; detailedResults };
      };
    };
  };

  public shared ({ caller = _ }) func initialize() : async () {
    if (subjects.isEmpty()) {
      subjects.add(1, { id = 1; name = "Mathematics" });
      subjects.add(2, { id = 2; name = "Science" });
      subjects.add(3, { id = 3; name = "Islamic Studies" });
      subjects.add(4, { id = 4; name = "Pakistan Studies" });
      subjects.add(5, { id = 5; name = "International Relations" });
      subjects.add(6, { id = 6; name = "English" });
      subjects.add(7, { id = 7; name = "Urdu" });

      // ===== MATHEMATICS QUIZZES =====
      quizzes.add(1, {
        id = 1; subjectId = 1; name = "Algebra Basics";
        questions = [
          { id = 1; questionText = "What is the value of x if 2x + 4 = 10?"; options = ["2", "3", "4", "5"]; correctOption = 1 },
          { id = 2; questionText = "Simplify: 3(x + 2) = ?"; options = ["3x + 2", "3x + 6", "x + 6", "3x + 5"]; correctOption = 1 },
          { id = 3; questionText = "What is the square root of 144?"; options = ["10", "11", "12", "13"]; correctOption = 2 },
          { id = 4; questionText = "If a = 5, b = 3, what is a² - b²?"; options = ["16", "22", "25", "34"]; correctOption = 0 },
          { id = 5; questionText = "Solve: 5x - 3 = 22"; options = ["4", "5", "6", "7"]; correctOption = 1 },
          { id = 6; questionText = "What is the coefficient of x in 7x + 3?"; options = ["3", "7", "10", "21"]; correctOption = 1 },
          { id = 7; questionText = "Which is a quadratic equation?"; options = ["2x + 1 = 0", "x² + 3x + 2 = 0", "x = 5", "3x - 2 = 7"]; correctOption = 1 },
          { id = 8; questionText = "Factor: x² - 9 = ?"; options = ["(x-3)(x-3)", "(x+9)(x-1)", "(x+3)(x-3)", "(x+1)(x-9)"]; correctOption = 2 },
          { id = 9; questionText = "What is the sum of roots of x² - 5x + 6 = 0?"; options = ["2", "3", "5", "6"]; correctOption = 2 },
          { id = 10; questionText = "If f(x) = 2x + 1, find f(3)."; options = ["5", "6", "7", "8"]; correctOption = 2 }
        ];
      });

      quizzes.add(2, {
        id = 2; subjectId = 1; name = "Geometry & Shapes";
        questions = [
          { id = 1; questionText = "Sum of interior angles of a triangle?"; options = ["90°", "180°", "270°", "360°"]; correctOption = 1 },
          { id = 2; questionText = "Area of a rectangle with length 8 and width 5?"; options = ["13", "26", "40", "45"]; correctOption = 2 },
          { id = 3; questionText = "How many sides does a hexagon have?"; options = ["4", "5", "6", "7"]; correctOption = 2 },
          { id = 4; questionText = "The perimeter of a square with side 7 cm?"; options = ["14 cm", "21 cm", "28 cm", "49 cm"]; correctOption = 2 },
          { id = 5; questionText = "Area of a circle with radius 7 (π=22/7)?"; options = ["44", "88", "154", "176"]; correctOption = 2 },
          { id = 6; questionText = "Volume of a cube with side 4 cm?"; options = ["16 cm³", "32 cm³", "48 cm³", "64 cm³"]; correctOption = 3 },
          { id = 7; questionText = "Pythagoras theorem: a² + b² = ?"; options = ["c", "c²", "2c", "c³"]; correctOption = 1 },
          { id = 8; questionText = "An equilateral triangle has all angles equal to?"; options = ["45°", "60°", "90°", "120°"]; correctOption = 1 },
          { id = 9; questionText = "Sum of interior angles of a quadrilateral?"; options = ["180°", "270°", "360°", "540°"]; correctOption = 2 },
          { id = 10; questionText = "Diameter of a circle with radius 6?"; options = ["3", "6", "12", "18"]; correctOption = 2 }
        ];
      });

      quizzes.add(3, {
        id = 3; subjectId = 1; name = "Arithmetic & Numbers";
        questions = [
          { id = 1; questionText = "What is 15% of 200?"; options = ["25", "30", "35", "40"]; correctOption = 1 },
          { id = 2; questionText = "What is the LCM of 4 and 6?"; options = ["8", "10", "12", "24"]; correctOption = 2 },
          { id = 3; questionText = "What is the HCF of 12 and 18?"; options = ["2", "3", "6", "9"]; correctOption = 2 },
          { id = 4; questionText = "Convert 3/4 to percentage."; options = ["60%", "70%", "75%", "80%"]; correctOption = 2 },
          { id = 5; questionText = "What is 2⁵?"; options = ["8", "16", "32", "64"]; correctOption = 2 },
          { id = 6; questionText = "Which is a prime number?"; options = ["9", "15", "17", "21"]; correctOption = 2 },
          { id = 7; questionText = "What is the value of π (pi) approximately?"; options = ["2.14", "3.14", "4.14", "5.14"]; correctOption = 1 },
          { id = 8; questionText = "Simplify: 48 ÷ 6 × 2"; options = ["4", "8", "16", "24"]; correctOption = 2 },
          { id = 9; questionText = "What is the ratio of 25 to 75 in simplest form?"; options = ["1:2", "1:3", "2:3", "3:1"]; correctOption = 1 },
          { id = 10; questionText = "Square of 13?"; options = ["159", "169", "179", "189"]; correctOption = 1 }
        ];
      });

      quizzes.add(4, {
        id = 4; subjectId = 1; name = "Statistics & Probability";
        questions = [
          { id = 1; questionText = "Mean of 2, 4, 6, 8, 10?"; options = ["4", "5", "6", "7"]; correctOption = 2 },
          { id = 2; questionText = "Median of 3, 7, 9, 12, 15?"; options = ["7", "8", "9", "10"]; correctOption = 2 },
          { id = 3; questionText = "Mode of 1, 2, 2, 3, 4, 4, 4?"; options = ["1", "2", "3", "4"]; correctOption = 3 },
          { id = 4; questionText = "Probability of getting heads in a coin toss?"; options = ["0", "1/4", "1/2", "1"]; correctOption = 2 },
          { id = 5; questionText = "Range of 5, 10, 15, 20, 25?"; options = ["10", "15", "20", "25"]; correctOption = 2 },
          { id = 6; questionText = "A bag has 3 red and 2 blue balls. Probability of picking red?"; options = ["1/5", "2/5", "3/5", "4/5"]; correctOption = 2 },
          { id = 7; questionText = "What does a bar chart display?"; options = ["Continuous data", "Categorical data", "Probability", "Fractions"]; correctOption = 1 },
          { id = 8; questionText = "Sum of all probabilities in a sample space?"; options = ["0", "0.5", "1", "2"]; correctOption = 2 },
          { id = 9; questionText = "How many outcomes when rolling a die?"; options = ["4", "5", "6", "8"]; correctOption = 2 },
          { id = 10; questionText = "Variance measures?"; options = ["Central tendency", "Spread of data", "Sum of data", "Probability"]; correctOption = 1 }
        ];
      });

      quizzes.add(5, {
        id = 5; subjectId = 1; name = "Calculus Fundamentals";
        questions = [
          { id = 1; questionText = "Derivative of x²?"; options = ["x", "2x", "x²", "2"]; correctOption = 1 },
          { id = 2; questionText = "Integral of 2x dx?"; options = ["x", "x²", "2x²", "x² + C"]; correctOption = 3 },
          { id = 3; questionText = "Derivative of a constant?"; options = ["1", "0", "constant", "undefined"]; correctOption = 1 },
          { id = 4; questionText = "What is the limit of (1/x) as x→∞?"; options = ["-1", "0", "1", "∞"]; correctOption = 1 },
          { id = 5; questionText = "Derivative of sin(x)?"; options = ["-cos(x)", "cos(x)", "tan(x)", "-sin(x)"]; correctOption = 1 },
          { id = 6; questionText = "Integral of 1/x dx?"; options = ["x", "ln(x) + C", "1/x²", "e^x"]; correctOption = 1 },
          { id = 7; questionText = "Which symbol represents integration?"; options = ["Σ", "Δ", "∫", "∂"]; correctOption = 2 },
          { id = 8; questionText = "Derivative of e^x?"; options = ["xe^x", "e^x", "e^(x-1)", "1/e^x"]; correctOption = 1 },
          { id = 9; questionText = "Chain rule is used for?"; options = ["Sum of functions", "Composite functions", "Constant functions", "Product of two"]; correctOption = 1 },
          { id = 10; questionText = "∫ cos(x) dx = ?"; options = ["-sin(x) + C", "sin(x) + C", "tan(x) + C", "-cos(x) + C"]; correctOption = 1 }
        ];
      });

      // ===== SCIENCE QUIZZES =====
      quizzes.add(6, {
        id = 6; subjectId = 2; name = "Physics Basics";
        questions = [
          { id = 1; questionText = "SI unit of force?"; options = ["Watt", "Joule", "Newton", "Pascal"]; correctOption = 2 },
          { id = 2; questionText = "Speed of light in vacuum?"; options = ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10¹² m/s"]; correctOption = 1 },
          { id = 3; questionText = "Newton's first law is called?"; options = ["Law of Motion", "Law of Inertia", "Law of Gravity", "Law of Energy"]; correctOption = 1 },
          { id = 4; questionText = "Formula for kinetic energy?"; options = ["mgh", "mv", "½mv²", "F×d"]; correctOption = 2 },
          { id = 5; questionText = "Ohm's law: V = ?"; options = ["I/R", "IR", "I+R", "I²R"]; correctOption = 1 },
          { id = 6; questionText = "Unit of electrical resistance?"; options = ["Volt", "Ampere", "Ohm", "Watt"]; correctOption = 2 },
          { id = 7; questionText = "Which wave does not require medium?"; options = ["Sound wave", "Water wave", "Electromagnetic wave", "Seismic wave"]; correctOption = 2 },
          { id = 8; questionText = "Acceleration due to gravity on Earth?"; options = ["8.9 m/s²", "9.8 m/s²", "10.8 m/s²", "11 m/s²"]; correctOption = 1 },
          { id = 9; questionText = "Power = ?"; options = ["Force × Distance", "Mass × Velocity", "Work / Time", "Energy × Time"]; correctOption = 2 },
          { id = 10; questionText = "Which color has the highest frequency in visible light?"; options = ["Red", "Green", "Blue", "Violet"]; correctOption = 3 }
        ];
      });

      quizzes.add(7, {
        id = 7; subjectId = 2; name = "Chemistry Basics";
        questions = [
          { id = 1; questionText = "Chemical symbol for Gold?"; options = ["Go", "Gd", "Au", "Ag"]; correctOption = 2 },
          { id = 2; questionText = "Atomic number of Carbon?"; options = ["4", "6", "8", "12"]; correctOption = 1 },
          { id = 3; questionText = "pH of pure water?"; options = ["5", "6", "7", "8"]; correctOption = 2 },
          { id = 4; questionText = "Chemical formula of water?"; options = ["HO", "H₂O", "H₂O₂", "OH"]; correctOption = 1 },
          { id = 5; questionText = "Which gas is needed for combustion?"; options = ["Nitrogen", "Carbon dioxide", "Oxygen", "Hydrogen"]; correctOption = 2 },
          { id = 6; questionText = "What is NaCl commonly known as?"; options = ["Sugar", "Baking soda", "Table salt", "Vinegar"]; correctOption = 2 },
          { id = 7; questionText = "Lightest element in the periodic table?"; options = ["Helium", "Hydrogen", "Lithium", "Carbon"]; correctOption = 1 },
          { id = 8; questionText = "Number of electrons in Oxygen?"; options = ["6", "7", "8", "9"]; correctOption = 2 },
          { id = 9; questionText = "Chemical symbol for Iron?"; options = ["Ir", "In", "Fe", "Fr"]; correctOption = 2 },
          { id = 10; questionText = "Acid has pH?"; options = ["Greater than 7", "Equal to 7", "Less than 7", "Equal to 14"]; correctOption = 2 }
        ];
      });

      quizzes.add(8, {
        id = 8; subjectId = 2; name = "Biology Basics";
        questions = [
          { id = 1; questionText = "Basic unit of life?"; options = ["Organ", "Tissue", "Cell", "Organism"]; correctOption = 2 },
          { id = 2; questionText = "Photosynthesis occurs in?"; options = ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"]; correctOption = 2 },
          { id = 3; questionText = "DNA stands for?"; options = ["Deoxyribonucleic Acid", "Diribose Nucleic Acid", "Deoxyribosome Acid", "None"]; correctOption = 0 },
          { id = 4; questionText = "How many chromosomes in human body cell?"; options = ["23", "44", "46", "48"]; correctOption = 2 },
          { id = 5; questionText = "Powerhouse of the cell?"; options = ["Nucleus", "Ribosome", "Mitochondria", "Vacuole"]; correctOption = 2 },
          { id = 6; questionText = "Blood group discovered by?"; options = ["Fleming", "Pasteur", "Landsteiner", "Darwin"]; correctOption = 2 },
          { id = 7; questionText = "Which organ produces insulin?"; options = ["Liver", "Kidney", "Pancreas", "Stomach"]; correctOption = 2 },
          { id = 8; questionText = "Largest organ of human body?"; options = ["Heart", "Liver", "Lung", "Skin"]; correctOption = 3 },
          { id = 9; questionText = "Plant cell wall is made of?"; options = ["Chitin", "Protein", "Cellulose", "Lipids"]; correctOption = 2 },
          { id = 10; questionText = "Normal body temperature in Fahrenheit?"; options = ["96.8°F", "98.6°F", "99.6°F", "100°F"]; correctOption = 1 }
        ];
      });

      quizzes.add(9, {
        id = 9; subjectId = 2; name = "Environmental Science";
        questions = [
          { id = 1; questionText = "Ozone layer is in which part of atmosphere?"; options = ["Troposphere", "Stratosphere", "Mesosphere", "Exosphere"]; correctOption = 1 },
          { id = 2; questionText = "Main cause of global warming?"; options = ["Deforestation", "CO₂ emissions", "Both A and B", "Water pollution"]; correctOption = 2 },
          { id = 3; questionText = "Greenhouse gas?"; options = ["Nitrogen", "Oxygen", "Carbon dioxide", "Argon"]; correctOption = 2 },
          { id = 4; questionText = "Acid rain is caused by?"; options = ["CO₂", "SO₂ and NOₓ", "H₂O", "O₃"]; correctOption = 1 },
          { id = 5; questionText = "Which energy source is renewable?"; options = ["Coal", "Natural gas", "Solar", "Petroleum"]; correctOption = 2 },
          { id = 6; questionText = "Food chain starts with?"; options = ["Herbivore", "Carnivore", "Producers", "Decomposers"]; correctOption = 2 },
          { id = 7; questionText = "Carbon cycle involves?"; options = ["Only plants", "Only animals", "Plants, animals and atmosphere", "Only bacteria"]; correctOption = 2 },
          { id = 8; questionText = "Earth's most abundant gas in atmosphere?"; options = ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"]; correctOption = 1 },
          { id = 9; questionText = "Which ecosystem has highest biodiversity?"; options = ["Desert", "Grassland", "Tropical rainforest", "Tundra"]; correctOption = 2 },
          { id = 10; questionText = "3 Rs of environment?"; options = ["Read, Research, Recycle", "Reduce, Reuse, Recycle", "Replace, Renew, Remove", "None"]; correctOption = 1 }
        ];
      });

      quizzes.add(10, {
        id = 10; subjectId = 2; name = "Human Anatomy";
        questions = [
          { id = 1; questionText = "How many bones in adult human body?"; options = ["196", "206", "216", "226"]; correctOption = 1 },
          { id = 2; questionText = "Which blood cells carry oxygen?"; options = ["White blood cells", "Platelets", "Red blood cells", "Plasma"]; correctOption = 2 },
          { id = 3; questionText = "Hardest substance in human body?"; options = ["Bone", "Cartilage", "Enamel", "Muscle"]; correctOption = 2 },
          { id = 4; questionText = "Which part of brain controls breathing?"; options = ["Cerebrum", "Cerebellum", "Medulla", "Thalamus"]; correctOption = 2 },
          { id = 5; questionText = "Normal human heart rate (beats/min)?"; options = ["50-60", "60-100", "100-120", "120-150"]; correctOption = 1 },
          { id = 6; questionText = "Largest bone in human body?"; options = ["Tibia", "Fibula", "Femur", "Radius"]; correctOption = 2 },
          { id = 7; questionText = "Which vitamin is produced by sunlight?"; options = ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"]; correctOption = 3 },
          { id = 8; questionText = "Smallest bone in human body?"; options = ["Stirrup (stapes)", "Fibula", "Coccyx", "Phalanx"]; correctOption = 0 },
          { id = 9; questionText = "Blood is filtered by?"; options = ["Liver", "Kidneys", "Lungs", "Stomach"]; correctOption = 1 },
          { id = 10; questionText = "Which organ controls body temperature?"; options = ["Heart", "Liver", "Hypothalamus", "Spleen"]; correctOption = 2 }
        ];
      });

      // ===== ISLAMIC STUDIES QUIZZES =====
      quizzes.add(11, {
        id = 11; subjectId = 3; name = "Quran & Revelation";
        questions = [
          { id = 1; questionText = "How many Surahs (chapters) are in the Quran?"; options = ["110", "114", "118", "120"]; correctOption = 1 },
          { id = 2; questionText = "First Surah of the Quran?"; options = ["Surah Baqarah", "Surah Fatiha", "Surah Ikhlas", "Surah Nas"]; correctOption = 1 },
          { id = 3; questionText = "Longest Surah in Quran?"; options = ["Surah Fatiha", "Surah Yusuf", "Surah Baqarah", "Surah Nisa"]; correctOption = 2 },
          { id = 4; questionText = "In which month was Quran revealed?"; options = ["Rajab", "Shaban", "Ramadan", "Muharram"]; correctOption = 2 },
          { id = 5; questionText = "Quran was revealed over how many years?"; options = ["10", "15", "23", "25"]; correctOption = 2 },
          { id = 6; questionText = "First word revealed in Quran?"; options = ["Bismillah", "Iqra", "Alhamdulillah", "Allah"]; correctOption = 1 },
          { id = 7; questionText = "Angel who brought revelation to Prophet?"; options = ["Mikail", "Israfil", "Jibrail", "Azrail"]; correctOption = 2 },
          { id = 8; questionText = "Shortest Surah in Quran?"; options = ["Surah Nasr", "Surah Kausar", "Surah Ikhlas", "Surah Falaq"]; correctOption = 1 },
          { id = 9; questionText = "What does 'Quran' mean?"; options = ["The Book", "The Recitation", "The Message", "The Word"]; correctOption = 1 },
          { id = 10; questionText = "How many Paras (Juz) in Quran?"; options = ["20", "25", "30", "35"]; correctOption = 2 }
        ];
      });

      quizzes.add(12, {
        id = 12; subjectId = 3; name = "Prophet Muhammad (PBUH)";
        questions = [
          { id = 1; questionText = "Prophet Muhammad (PBUH) was born in?"; options = ["Madinah", "Makkah", "Taif", "Jerusalem"]; correctOption = 1 },
          { id = 2; questionText = "Year of Prophet's birth (Islamic)?"; options = ["570 AD", "571 AD", "572 AD", "573 AD"]; correctOption = 1 },
          { id = 3; questionText = "Father of Prophet Muhammad?"; options = ["Abu Talib", "Abdullah", "Abdul Muttalib", "Abbas"]; correctOption = 1 },
          { id = 4; questionText = "Mother of Prophet Muhammad?"; options = ["Khadijah", "Fatima", "Aminah", "Maryam"]; correctOption = 2 },
          { id = 5; questionText = "At what age did Prophet receive first revelation?"; options = ["35", "38", "40", "45"]; correctOption = 2 },
          { id = 6; questionText = "Prophet's migration to Madinah is called?"; options = ["Fath", "Hijra", "Jihad", "Salat"]; correctOption = 1 },
          { id = 7; questionText = "First wife of Prophet Muhammad?"; options = ["Aisha", "Fatima", "Khadijah", "Hafsa"]; correctOption = 2 },
          { id = 8; questionText = "Prophet's daughter who is Sayyidat-un-Nisa?"; options = ["Ruqayyah", "Umm Kulthum", "Zainab", "Fatima"]; correctOption = 3 },
          { id = 9; questionText = "How many total wives did Prophet have?"; options = ["9", "11", "13", "15"]; correctOption = 1 },
          { id = 10; questionText = "Year of Prophet's death?"; options = ["630 AD", "632 AD", "634 AD", "640 AD"]; correctOption = 1 }
        ];
      });

      quizzes.add(13, {
        id = 13; subjectId = 3; name = "Five Pillars of Islam";
        questions = [
          { id = 1; questionText = "First pillar of Islam?"; options = ["Salat", "Sawm", "Shahadah", "Zakat"]; correctOption = 2 },
          { id = 2; questionText = "How many times a day is Salat performed?"; options = ["3", "4", "5", "6"]; correctOption = 2 },
          { id = 3; questionText = "Zakat is obligatory on whom?"; options = ["Everyone", "Only men", "Those with Nisab", "Only rich"]; correctOption = 2 },
          { id = 4; questionText = "Sawm (fasting) is performed in which month?"; options = ["Muharram", "Rajab", "Ramadan", "Shawwal"]; correctOption = 2 },
          { id = 5; questionText = "Hajj is performed in which month?"; options = ["Muharram", "Ramadan", "Dhul Hijjah", "Rajab"]; correctOption = 2 },
          { id = 6; questionText = "Minimum Nisab for Zakat is approximately?"; options = ["52.5 tola silver", "7.5 tola gold", "Both A and B", "None"]; correctOption = 2 },
          { id = 7; questionText = "Shahadah means?"; options = ["Prayer", "Fasting", "Declaration of faith", "Pilgrimage"]; correctOption = 2 },
          { id = 8; questionText = "Direction of prayer (Qibla) is toward?"; options = ["Madinah", "Jerusalem", "Makkah (Kaabah)", "Baghdad"]; correctOption = 2 },
          { id = 9; questionText = "First Eid in Islam is celebrated after?"; options = ["Hajj", "Ramadan fasting", "Prophet's birthday", "Hijra"]; correctOption = 1 },
          { id = 10; questionText = "Zakat rate is?"; options = ["1%", "2.5%", "5%", "10%"]; correctOption = 1 }
        ];
      });

      quizzes.add(14, {
        id = 14; subjectId = 3; name = "Islamic History";
        questions = [
          { id = 1; questionText = "First Caliph of Islam?"; options = ["Umar (RA)", "Abu Bakr (RA)", "Uthman (RA)", "Ali (RA)"]; correctOption = 1 },
          { id = 2; questionText = "Battle of Badr was fought in?"; options = ["1 AH", "2 AH", "3 AH", "4 AH"]; correctOption = 1 },
          { id = 3; questionText = "Conquest of Makkah occurred in?"; options = ["6 AH", "7 AH", "8 AH", "9 AH"]; correctOption = 2 },
          { id = 4; questionText = "Islam's golden age is associated with?"; options = ["Umayyad dynasty", "Abbasid dynasty", "Ottoman empire", "Mughal empire"]; correctOption = 1 },
          { id = 5; questionText = "Quran was compiled in book form during whose reign?"; options = ["Abu Bakr (RA)", "Umar (RA)", "Uthman (RA)", "Ali (RA)"]; correctOption = 0 },
          { id = 6; questionText = "First Mosque built by Prophet?"; options = ["Masjid Haram", "Masjid Nabawi", "Masjid Quba", "Masjid Aqsa"]; correctOption = 2 },
          { id = 7; questionText = "Treaty of Hudaibiyah was signed in?"; options = ["5 AH", "6 AH", "7 AH", "8 AH"]; correctOption = 1 },
          { id = 8; questionText = "How many Caliphs are known as Khulafa-e-Rashideen?"; options = ["2", "3", "4", "5"]; correctOption = 2 },
          { id = 9; questionText = "Hazrat Khadijah was the first?"; options = ["Companion", "Convert to Islam", "Woman to accept Islam", "Both B and C"]; correctOption = 3 },
          { id = 10; questionText = "Islamic New Year starts with which month?"; options = ["Ramadan", "Rajab", "Muharram", "Safar"]; correctOption = 2 }
        ];
      });

      quizzes.add(15, {
        id = 15; subjectId = 3; name = "Hadith & Sunnah";
        questions = [
          { id = 1; questionText = "Hadith means?"; options = ["Verse of Quran", "Saying of Prophet", "Islamic law", "Prayer"]; correctOption = 1 },
          { id = 2; questionText = "Sunnah refers to?"; options = ["Quran only", "Practices of Prophet", "Islamic calendar", "Scholars' opinions"]; correctOption = 1 },
          { id = 3; questionText = "Most authentic Hadith collection?"; options = ["Sunan Abu Dawud", "Sahih Muslim", "Sahih Bukhari", "Tirmidhi"]; correctOption = 2 },
          { id = 4; questionText = "Compiler of Sahih Bukhari?"; options = ["Imam Muslim", "Imam Bukhari", "Imam Abu Dawud", "Imam Tirmidhi"]; correctOption = 1 },
          { id = 5; questionText = "How many Hadith are in Sahih Bukhari approximately?"; options = ["3000", "5000", "7275", "10000"]; correctOption = 2 },
          { id = 6; questionText = "Isnad in Hadith means?"; options = ["Text of Hadith", "Chain of narrators", "Topic of Hadith", "Category"]; correctOption = 1 },
          { id = 7; questionText = "Strongest category of Hadith?"; options = ["Da'if", "Hasan", "Sahih", "Mawdu"]; correctOption = 2 },
          { id = 8; questionText = "Six major Hadith books are called?"; options = ["Sihah Sitta", "Kutub al-Arba", "Al-Jami", "Musnad"]; correctOption = 0 },
          { id = 9; questionText = "Matan in Hadith terminology means?"; options = ["Chain", "Text/content", "Narrator", "Weakness"]; correctOption = 1 },
          { id = 10; questionText = "Weak Hadith is called?"; options = ["Sahih", "Hasan", "Da'if", "Mutawatir"]; correctOption = 2 }
        ];
      });

      // ===== PAKISTAN STUDIES QUIZZES =====
      quizzes.add(16, {
        id = 16; subjectId = 4; name = "Pakistan Independence";
        questions = [
          { id = 1; questionText = "Pakistan gained independence on?"; options = ["14 August 1947", "15 August 1947", "23 March 1947", "14 August 1948"]; correctOption = 0 },
          { id = 2; questionText = "Who is the founder of Pakistan?"; options = ["Allama Iqbal", "Liaquat Ali Khan", "Quaid-e-Azam Muhammad Ali Jinnah", "Sir Syed Ahmed Khan"]; correctOption = 2 },
          { id = 3; questionText = "Pakistan Resolution was passed on?"; options = ["23 March 1940", "14 August 1947", "11 August 1947", "25 December 1876"]; correctOption = 0 },
          { id = 4; questionText = "First capital of Pakistan?"; options = ["Islamabad", "Lahore", "Karachi", "Rawalpindi"]; correctOption = 2 },
          { id = 5; questionText = "Pakistan became a republic on?"; options = ["14 August 1947", "23 March 1956", "23 March 1940", "7 October 1958"]; correctOption = 1 },
          { id = 6; questionText = "First Prime Minister of Pakistan?"; options = ["Quaid-e-Azam", "Liaquat Ali Khan", "Khawaja Nazimuddin", "Zulfikar Ali Bhutto"]; correctOption = 1 },
          { id = 7; questionText = "National language of Pakistan?"; options = ["Punjabi", "English", "Urdu", "Sindhi"]; correctOption = 2 },
          { id = 8; questionText = "Two-Nation Theory means?"; options = ["Two provinces", "Hindus and Muslims are two nations", "Two languages", "Two capitals"]; correctOption = 1 },
          { id = 9; questionText = "Poet of the East (Shair-e-Mashriq)?"; options = ["Faiz Ahmed Faiz", "Sir Syed", "Allama Iqbal", "Josh Malihabadi"]; correctOption = 2 },
          { id = 10; questionText = "AIML stands for?"; options = ["All India Muslim League", "All India Madrasa League", "Association of India Muslim Leaders", "None"]; correctOption = 0 }
        ];
      });

      quizzes.add(17, {
        id = 17; subjectId = 4; name = "Geography of Pakistan";
        questions = [
          { id = 1; questionText = "Highest peak in Pakistan?"; options = ["Nanga Parbat", "K2", "Broad Peak", "Rakaposhi"]; correctOption = 1 },
          { id = 2; questionText = "Largest province by area?"; options = ["Punjab", "Sindh", "KPK", "Balochistan"]; correctOption = 3 },
          { id = 3; questionText = "Longest river of Pakistan?"; options = ["Chenab", "Jhelum", "Indus", "Sutlej"]; correctOption = 2 },
          { id = 4; questionText = "Pakistan shares border with how many countries?"; options = ["3", "4", "5", "6"]; correctOption = 1 },
          { id = 5; questionText = "Capital of Pakistan?"; options = ["Karachi", "Lahore", "Islamabad", "Peshawar"]; correctOption = 2 },
          { id = 6; questionText = "Thar Desert is located in?"; options = ["Punjab", "Balochistan", "Sindh", "KPK"]; correctOption = 2 },
          { id = 7; questionText = "Largest city by population in Pakistan?"; options = ["Islamabad", "Lahore", "Karachi", "Faisalabad"]; correctOption = 2 },
          { id = 8; questionText = "Pakistan's coastline length approximately?"; options = ["800 km", "1000 km", "1050 km", "1200 km"]; correctOption = 2 },
          { id = 9; questionText = "Which province borders Afghanistan and Iran?"; options = ["Punjab", "Sindh", "Balochistan", "KPK"]; correctOption = 2 },
          { id = 10; questionText = "Famous Khyber Pass connects Pakistan to?"; options = ["India", "Iran", "Afghanistan", "China"]; correctOption = 2 }
        ];
      });

      quizzes.add(18, {
        id = 18; subjectId = 4; name = "Pakistan Constitution";
        questions = [
          { id = 1; questionText = "First Constitution of Pakistan was adopted in?"; options = ["1947", "1956", "1962", "1973"]; correctOption = 1 },
          { id = 2; questionText = "Current constitution of Pakistan was adopted in?"; options = ["1956", "1962", "1973", "1985"]; correctOption = 2 },
          { id = 3; questionText = "Pakistan is declared as Islamic Republic in which constitution?"; options = ["1947", "1956", "1962", "1973"]; correctOption = 1 },
          { id = 4; questionText = "National Assembly has how many general seats?"; options = ["272", "300", "336", "342"]; correctOption = 0 },
          { id = 5; questionText = "President of Pakistan is elected by?"; options = ["General public", "National Assembly only", "Electoral College", "Senate only"]; correctOption = 2 },
          { id = 6; questionText = "Minimum age to vote in Pakistan?"; options = ["16", "18", "21", "25"]; correctOption = 1 },
          { id = 7; questionText = "Senate of Pakistan has how many members?"; options = ["87", "96", "100", "104"]; correctOption = 3 },
          { id = 8; questionText = "Fundamental Rights are in which Part of Constitution?"; options = ["Part I", "Part II", "Part III", "Part IV"]; correctOption = 1 },
          { id = 9; questionText = "Who was the chairman of constitution committee 1973?"; options = ["Bhutto", "Fazlur Rehman", "Abdul Hafeez Pirzada", "Ayub Khan"]; correctOption = 2 },
          { id = 10; questionText = "18th Amendment was about?"; options = ["Women rights", "Devolution of power to provinces", "Election reforms", "Judiciary"]; correctOption = 1 }
        ];
      });

      quizzes.add(19, {
        id = 19; subjectId = 4; name = "Pakistan Economy & Culture";
        questions = [
          { id = 1; questionText = "Currency of Pakistan?"; options = ["Rupee", "Taka", "Riyal", "Dirham"]; correctOption = 0 },
          { id = 2; questionText = "Major cash crop of Pakistan?"; options = ["Wheat", "Rice", "Cotton", "Sugarcane"]; correctOption = 2 },
          { id = 3; questionText = "National sport of Pakistan?"; options = ["Cricket", "Hockey", "Football", "Kabaddi"]; correctOption = 1 },
          { id = 4; questionText = "Largest city by area in Pakistan?"; options = ["Karachi", "Lahore", "Quetta", "Turbat"]; correctOption = 0 },
          { id = 5; questionText = "National flower of Pakistan?"; options = ["Rose", "Sunflower", "Jasmine", "Lily"]; correctOption = 2 },
          { id = 6; questionText = "Pakistan's main export?"; options = ["Cars", "Textiles", "Electronics", "Oil"]; correctOption = 1 },
          { id = 7; questionText = "CPEC stands for?"; options = ["China Pakistan Economic Corridor", "Central Pakistan Economic Center", "China Pakistan Energy Cooperation", "None"]; correctOption = 0 },
          { id = 8; questionText = "National bird of Pakistan?"; options = ["Pigeon", "Eagle", "Chukar Partridge", "Peacock"]; correctOption = 2 },
          { id = 9; questionText = "Pakistan Stock Exchange is located in?"; options = ["Islamabad", "Lahore", "Karachi", "Peshawar"]; correctOption = 2 },
          { id = 10; questionText = "National tree of Pakistan?"; options = ["Mango", "Deodar Cedar", "Neem", "Shisham"]; correctOption = 1 }
        ];
      });

      quizzes.add(20, {
        id = 20; subjectId = 4; name = "Pak Military & Foreign Policy";
        questions = [
          { id = 1; questionText = "Pakistan's nuclear tests were in?"; options = ["1996", "1997", "1998", "1999"]; correctOption = 2 },
          { id = 2; questionText = "Pakistan joined UN in?"; options = ["1945", "1947", "1948", "1950"]; correctOption = 1 },
          { id = 3; questionText = "Operation Gibraltar was in?"; options = ["1965", "1971", "1999", "2001"]; correctOption = 0 },
          { id = 4; questionText = "Simla Agreement was signed in?"; options = ["1965", "1970", "1972", "1975"]; correctOption = 2 },
          { id = 5; questionText = "Pakistan's first military dictator?"; options = ["Yahya Khan", "Ayub Khan", "Zia ul-Haq", "Pervez Musharraf"]; correctOption = 1 },
          { id = 6; questionText = "Tashkent Declaration (1966) was between?"; options = ["Pak-Afghanistan", "Pak-India", "Pak-China", "Pak-Russia"]; correctOption = 1 },
          { id = 7; questionText = "Pakistan's ISI full form?"; options = ["Inter-Services Intelligence", "Internal Security Intelligence", "International Security Intelligence", "None"]; correctOption = 0 },
          { id = 8; questionText = "East Pakistan became Bangladesh in?"; options = ["1970", "1971", "1972", "1973"]; correctOption = 1 },
          { id = 9; questionText = "Kargil conflict was in?"; options = ["1997", "1998", "1999", "2001"]; correctOption = 2 },
          { id = 10; questionText = "Pakistan's first female Prime Minister?"; options = ["Fatima Jinnah", "Benazir Bhutto", "Nusrat Bhutto", "Hina Rabbani Khar"]; correctOption = 1 }
        ];
      });

      // ===== INTERNATIONAL RELATIONS QUIZZES =====
      quizzes.add(21, {
        id = 21; subjectId = 5; name = "United Nations";
        questions = [
          { id = 1; questionText = "UN was founded in?"; options = ["1944", "1945", "1946", "1947"]; correctOption = 1 },
          { id = 2; questionText = "UN headquarters is in?"; options = ["London", "Geneva", "New York", "Paris"]; correctOption = 2 },
          { id = 3; questionText = "How many permanent members does UN Security Council have?"; options = ["3", "4", "5", "6"]; correctOption = 2 },
          { id = 4; questionText = "UN Secretary General (2024)?"; options = ["Kofi Annan", "Ban Ki-moon", "António Guterres", "Boutros Ghali"]; correctOption = 2 },
          { id = 5; questionText = "UNICEF stands for?"; options = ["UN International Children Emergency Fund", "UN International Cultural Exchange Fund", "UN International Children Education Fund", "None"]; correctOption = 0 },
          { id = 6; questionText = "Universal Declaration of Human Rights adopted in?"; options = ["1945", "1946", "1948", "1950"]; correctOption = 2 },
          { id = 7; questionText = "How many official languages does UN have?"; options = ["4", "5", "6", "7"]; correctOption = 2 },
          { id = 8; questionText = "Which country has never been a UN member?"; options = ["Switzerland", "Vatican City", "Kosovo", "Taiwan"]; correctOption = 1 },
          { id = 9; questionText = "UN General Assembly meets?"; options = ["Monthly", "Quarterly", "Annually", "Every 5 years"]; correctOption = 2 },
          { id = 10; questionText = "Veto power is held by?"; options = ["All UN members", "Only permanent 5 members", "G20 countries", "NATO members"]; correctOption = 1 }
        ];
      });

      quizzes.add(22, {
        id = 22; subjectId = 5; name = "Cold War & Superpowers";
        questions = [
          { id = 1; questionText = "Cold War was between?"; options = ["US & China", "US & USSR", "UK & France", "Germany & Russia"]; correctOption = 1 },
          { id = 2; questionText = "Berlin Wall fell in?"; options = ["1987", "1988", "1989", "1991"]; correctOption = 2 },
          { id = 3; questionText = "USSR dissolved in?"; options = ["1989", "1990", "1991", "1993"]; correctOption = 2 },
          { id = 4; questionText = "NATO was formed in?"; options = ["1945", "1947", "1949", "1951"]; correctOption = 2 },
          { id = 5; questionText = "Cuban Missile Crisis was in?"; options = ["1960", "1961", "1962", "1963"]; correctOption = 2 },
          { id = 6; questionText = "Marshall Plan was a US initiative to?"; options = ["Build military", "Reconstruct Europe", "Fight communism militarily", "None"]; correctOption = 1 },
          { id = 7; questionText = "Truman Doctrine (1947) was against?"; options = ["Fascism", "Colonialism", "Communism", "Terrorism"]; correctOption = 2 },
          { id = 8; questionText = "First country to launch satellite into space?"; options = ["USA", "UK", "USSR", "China"]; correctOption = 2 },
          { id = 9; questionText = "Detente refers to?"; options = ["Military buildup", "Easing of Cold War tensions", "Nuclear testing", "Arms race"]; correctOption = 1 },
          { id = 10; questionText = "Arms race primarily involved?"; options = ["Conventional weapons", "Nuclear weapons", "Chemical weapons", "Space weapons"]; correctOption = 1 }
        ];
      });

      quizzes.add(23, {
        id = 23; subjectId = 5; name = "Diplomacy & Treaties";
        questions = [
          { id = 1; questionText = "NPT stands for?"; options = ["Non-Proliferation Treaty", "National Peace Treaty", "Nuclear Power Treaty", "None"]; correctOption = 0 },
          { id = 2; questionText = "Oslo Accords (1993) were about?"; options = ["Iraq-Iran peace", "Israel-Palestine peace", "India-Pakistan", "US-Russia"]; correctOption = 1 },
          { id = 3; questionText = "Treaty of Versailles ended?"; options = ["World War II", "World War I", "Cold War", "Korean War"]; correctOption = 1 },
          { id = 4; questionText = "Kyoto Protocol was about?"; options = ["Nuclear weapons", "Climate change", "Trade", "Human rights"]; correctOption = 1 },
          { id = 5; questionText = "Paris Agreement (2015) deals with?"; options = ["Trade barriers", "Terrorism", "Climate change", "Migration"]; correctOption = 2 },
          { id = 6; questionText = "CTBT stands for?"; options = ["Comprehensive Test Ban Treaty", "Chemical Trade Ban Treaty", "Civilian Trade Ban Treaty", "None"]; correctOption = 0 },
          { id = 7; questionText = "WTO replaced?"; options = ["GATT", "IMF", "World Bank", "UNCTAD"]; correctOption = 0 },
          { id = 8; questionText = "START treaty is related to?"; options = ["Trade", "Strategic nuclear arms reduction", "Space exploration", "Environment"]; correctOption = 1 },
          { id = 9; questionText = "Brussels Treaty Organisation became?"; options = ["EU", "NATO", "OECD", "G7"]; correctOption = 1 },
          { id = 10; questionText = "Camp David Accords (1978) normalized relations between?"; options = ["US-Iran", "Egypt-Israel", "Syria-Israel", "Jordan-Palestine"]; correctOption = 1 }
        ];
      });

      quizzes.add(24, {
        id = 24; subjectId = 5; name = "South Asian Politics";
        questions = [
          { id = 1; questionText = "SAARC was established in?"; options = ["1980", "1983", "1985", "1987"]; correctOption = 2 },
          { id = 2; questionText = "How many member countries in SAARC?"; options = ["6", "7", "8", "9"]; correctOption = 2 },
          { id = 3; questionText = "SAARC headquarters is in?"; options = ["New Delhi", "Colombo", "Kathmandu", "Dhaka"]; correctOption = 2 },
          { id = 4; questionText = "Partition of India was in?"; options = ["1945", "1946", "1947", "1948"]; correctOption = 2 },
          { id = 5; questionText = "Bangladesh Liberation War was in?"; options = ["1969", "1970", "1971", "1972"]; correctOption = 2 },
          { id = 6; questionText = "Kashmir dispute is between?"; options = ["Pakistan & Afghanistan", "India & Pakistan", "India & Bangladesh", "Pakistan & China"]; correctOption = 1 },
          { id = 7; questionText = "First nuclear-armed country in South Asia?"; options = ["Pakistan", "India", "Bangladesh", "Sri Lanka"]; correctOption = 1 },
          { id = 8; questionText = "Simla Agreement was signed between?"; options = ["Pakistan & Afghanistan", "India & Pakistan", "India & China", "Pakistan & Bangladesh"]; correctOption = 1 },
          { id = 9; questionText = "India-Pakistan wars count?"; options = ["2", "3", "4", "5"]; correctOption = 1 },
          { id = 10; questionText = "Line of Control (LoC) divides?"; options = ["Punjab", "Kashmir", "Sindh", "Bengal"]; correctOption = 1 }
        ];
      });

      quizzes.add(25, {
        id = 25; subjectId = 5; name = "Global Organizations";
        questions = [
          { id = 1; questionText = "IMF stands for?"; options = ["International Monetary Fund", "International Military Force", "International Market Forum", "None"]; correctOption = 0 },
          { id = 2; questionText = "World Bank headquarters?"; options = ["New York", "London", "Washington D.C.", "Geneva"]; correctOption = 2 },
          { id = 3; questionText = "G20 represents?"; options = ["20 richest countries", "20 largest economies", "20 nuclear states", "20 Asian countries"]; correctOption = 1 },
          { id = 4; questionText = "WHO is headquartered in?"; options = ["New York", "Paris", "Geneva", "Vienna"]; correctOption = 2 },
          { id = 5; questionText = "ASEAN is an organization of?"; options = ["African nations", "Arab nations", "Southeast Asian nations", "South American nations"]; correctOption = 2 },
          { id = 6; questionText = "OIC stands for?"; options = ["Organization of Islamic Countries", "Organization of International Cooperation", "Organization of Islamic Cooperation", "None"]; correctOption = 2 },
          { id = 7; questionText = "EU was formally established by?"; options = ["Rome Treaty", "Maastricht Treaty", "Lisbon Treaty", "Amsterdam Treaty"]; correctOption = 1 },
          { id = 8; questionText = "SCO (Shanghai Cooperation Organisation) Pakistan joined in?"; options = ["2015", "2017", "2018", "2020"]; correctOption = 1 },
          { id = 9; questionText = "ICC stands for?"; options = ["International Criminal Court", "International Chamber of Commerce", "Both A and B", "None"]; correctOption = 0 },
          { id = 10; questionText = "Interpol headquarters?"; options = ["Paris", "Lyon", "Brussels", "Geneva"]; correctOption = 1 }
        ];
      });

      // ===== ENGLISH QUIZZES =====
      quizzes.add(26, {
        id = 26; subjectId = 6; name = "Grammar Basics";
        questions = [
          { id = 1; questionText = "What is a noun?"; options = ["Action word", "Describing word", "Name of person/place/thing", "Connecting word"]; correctOption = 2 },
          { id = 2; questionText = "Which is a proper noun?"; options = ["dog", "city", "London", "happiness"]; correctOption = 2 },
          { id = 3; questionText = "Identify the verb: 'She runs every day.'"; options = ["She", "runs", "every", "day"]; correctOption = 1 },
          { id = 4; questionText = "An adjective describes?"; options = ["Verb", "Noun/Pronoun", "Adverb", "Preposition"]; correctOption = 1 },
          { id = 5; questionText = "Choose correct sentence:"; options = ["He go to school.", "He goes to school.", "He going to school.", "He goed to school."]; correctOption = 1 },
          { id = 6; questionText = "'Beautiful' is an example of?"; options = ["Noun", "Verb", "Adjective", "Adverb"]; correctOption = 2 },
          { id = 7; questionText = "Plural of 'child'?"; options = ["Childs", "Childes", "Children", "Childrens"]; correctOption = 2 },
          { id = 8; questionText = "An adverb modifies?"; options = ["Only nouns", "Verbs/Adjectives/Other adverbs", "Only verbs", "Only adjectives"]; correctOption = 1 },
          { id = 9; questionText = "Which is a conjunction?"; options = ["Quickly", "Beautiful", "Because", "Under"]; correctOption = 2 },
          { id = 10; questionText = "'The dog barks' - 'barks' is?"; options = ["Noun", "Adjective", "Verb", "Adverb"]; correctOption = 2 }
        ];
      });

      quizzes.add(27, {
        id = 27; subjectId = 6; name = "Tenses & Usage";
        questions = [
          { id = 1; questionText = "'He is eating' - what tense?"; options = ["Simple present", "Present continuous", "Present perfect", "Past continuous"]; correctOption = 1 },
          { id = 2; questionText = "Past tense of 'go'?"; options = ["Goed", "Goes", "Gone", "Went"]; correctOption = 3 },
          { id = 3; questionText = "'She has eaten lunch.' - what tense?"; options = ["Simple past", "Present perfect", "Past perfect", "Future tense"]; correctOption = 1 },
          { id = 4; questionText = "Future tense of 'I go'?"; options = ["I gone", "I went", "I will go", "I have gone"]; correctOption = 2 },
          { id = 5; questionText = "Past continuous: 'She ___ singing.'"; options = ["is", "was", "will be", "has been"]; correctOption = 1 },
          { id = 6; questionText = "'They had finished before I arrived.' - tense?"; options = ["Simple past", "Past perfect", "Past continuous", "Present perfect"]; correctOption = 1 },
          { id = 7; questionText = "Passive voice of 'She writes a letter'?"; options = ["A letter writes she.", "A letter is written by her.", "She is written a letter.", "None"]; correctOption = 1 },
          { id = 8; questionText = "'He will have completed by 5 PM.' - tense?"; options = ["Future simple", "Future perfect", "Future continuous", "Present perfect"]; correctOption = 1 },
          { id = 9; questionText = "Simple past of 'run'?"; options = ["Runned", "Runs", "Running", "Ran"]; correctOption = 3 },
          { id = 10; questionText = "'Do you speak English?' - question uses?"; options = ["Will", "Do/Does", "Have", "Be"]; correctOption = 1 }
        ];
      });

      quizzes.add(28, {
        id = 28; subjectId = 6; name = "Vocabulary";
        questions = [
          { id = 1; questionText = "Synonym of 'happy'?"; options = ["Sad", "Angry", "Joyful", "Tired"]; correctOption = 2 },
          { id = 2; questionText = "Antonym of 'brave'?"; options = ["Bold", "Cowardly", "Daring", "Strong"]; correctOption = 1 },
          { id = 3; questionText = "'Benevolent' means?"; options = ["Cruel", "Kind/generous", "Lazy", "Angry"]; correctOption = 1 },
          { id = 4; questionText = "'Ambiguous' means?"; options = ["Clear", "Wrong", "Having double meaning", "Correct"]; correctOption = 2 },
          { id = 5; questionText = "Opposite of 'ancient'?"; options = ["Old", "Historic", "Modern", "Antique"]; correctOption = 2 },
          { id = 6; questionText = "'Verbose' means?"; options = ["Silent", "Using too many words", "Precise", "Polite"]; correctOption = 1 },
          { id = 7; questionText = "'Diligent' means?"; options = ["Lazy", "Hardworking", "Careless", "Stubborn"]; correctOption = 1 },
          { id = 8; questionText = "Synonym of 'enormous'?"; options = ["Tiny", "Average", "Huge", "Weak"]; correctOption = 2 },
          { id = 9; questionText = "'Candid' means?"; options = ["Dishonest", "Frank/Honest", "Hidden", "Vague"]; correctOption = 1 },
          { id = 10; questionText = "Antonym of 'abundant'?"; options = ["Plentiful", "Excess", "Scarce", "Enough"]; correctOption = 2 }
        ];
      });

      quizzes.add(29, {
        id = 29; subjectId = 6; name = "Reading Comprehension";
        questions = [
          { id = 1; questionText = "What is the main idea of a passage?"; options = ["First sentence", "Last sentence", "Central topic of the text", "Longest paragraph"]; correctOption = 2 },
          { id = 2; questionText = "Inference means?"; options = ["Direct statement", "Conclusion drawn from evidence", "Summary", "Title"]; correctOption = 1 },
          { id = 3; questionText = "A 'thesis statement' appears in?"; options = ["Conclusion", "Introduction", "Body paragraph", "Footnotes"]; correctOption = 1 },
          { id = 4; questionText = "Skimming a text means?"; options = ["Reading word-by-word", "Reading quickly for gist", "Reading backwards", "None"]; correctOption = 1 },
          { id = 5; questionText = "'Context clues' help you to?"; options = ["Find author", "Guess word meaning", "Count paragraphs", "Check grammar"]; correctOption = 1 },
          { id = 6; questionText = "Tone of a passage refers to?"; options = ["Length", "Author's attitude", "Characters", "Setting"]; correctOption = 1 },
          { id = 7; questionText = "Scanning is used to?"; options = ["Read everything", "Find specific information quickly", "Understand mood", "None"]; correctOption = 1 },
          { id = 8; questionText = "An author's purpose can be?"; options = ["To inform", "To entertain", "To persuade", "All of the above"]; correctOption = 3 },
          { id = 9; questionText = "A paragraph should have?"; options = ["Multiple main ideas", "One main idea", "No idea", "Only examples"]; correctOption = 1 },
          { id = 10; questionText = "Topic sentence is usually found?"; options = ["End of paragraph", "Beginning of paragraph", "Middle only", "In title"]; correctOption = 1 }
        ];
      });

      quizzes.add(30, {
        id = 30; subjectId = 6; name = "Literature & Writing";
        questions = [
          { id = 1; questionText = "Who wrote 'Romeo and Juliet'?"; options = ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"]; correctOption = 2 },
          { id = 2; questionText = "A sonnet has how many lines?"; options = ["8", "10", "14", "16"]; correctOption = 2 },
          { id = 3; questionText = "'Metaphor' is?"; options = ["Direct comparison using 'like' or 'as'", "Indirect comparison without 'like' or 'as'", "Exaggeration", "Personification"]; correctOption = 1 },
          { id = 4; questionText = "'The wind whispered' is an example of?"; options = ["Simile", "Metaphor", "Personification", "Alliteration"]; correctOption = 2 },
          { id = 5; questionText = "Protagonist in a story is?"; options = ["Villain", "Main/central character", "Minor character", "Narrator"]; correctOption = 1 },
          { id = 6; questionText = "Haiku is a type of poetry from?"; options = ["China", "India", "Japan", "Korea"]; correctOption = 2 },
          { id = 7; questionText = "Who wrote '1984'?"; options = ["Aldous Huxley", "George Orwell", "H.G. Wells", "Jules Verne"]; correctOption = 1 },
          { id = 8; questionText = "Setting in a story refers to?"; options = ["Characters", "Plot", "Time and place", "Conflict"]; correctOption = 2 },
          { id = 9; questionText = "Essay writing structure includes?"; options = ["Introduction, Body, Conclusion", "Only introduction", "Only body", "None"]; correctOption = 0 },
          { id = 10; questionText = "'Pride and Prejudice' was written by?"; options = ["Charlotte Bronte", "Emily Bronte", "Jane Austen", "Virginia Woolf"]; correctOption = 2 }
        ];
      });

      // ===== URDU QUIZZES =====
      quizzes.add(31, {
        id = 31; subjectId = 7; name = "Urdu Qawaid (Grammar)";
        questions = [
          { id = 1; questionText = "Urdu mein 'Isam' kya hota hai?"; options = ["Kaam ka naam", "Cheez ya shaks ka naam", "Sifat", "Fael"]; correctOption = 1 },
          { id = 2; questionText = "'Fael' kise kahte hain?"; options = ["Isam", "Kaam karne wala lafz", "Sifat", "Harf"]; correctOption = 1 },
          { id = 3; questionText = "'Sifat' kya batati hai?"; options = ["Kaam", "Jagah", "Isam ki khasiyat", "Waqt"]; correctOption = 2 },
          { id = 4; questionText = "'Zameer' ka kaam kya hai?"; options = ["Fael ki jagah", "Isam ki jagah", "Sifat ki jagah", "Harf ki jagah"]; correctOption = 1 },
          { id = 5; questionText = "Urdu ka Script kahan se liya gaya?"; options = ["Hindi", "Farsi aur Arabi", "Sanskrit", "Turki"]; correctOption = 1 },
          { id = 6; questionText = "'Harf e Jar' kya hota hai?"; options = ["Verb", "Noun", "Preposition", "Conjunction"]; correctOption = 2 },
          { id = 7; questionText = "Mubtada kise kahte hain?"; options = ["Jumlah ki khabar", "Jumlah ka subject", "Jumlah ka verb", "Jumlah ka object"]; correctOption = 1 },
          { id = 8; questionText = "Khabar kya hoti hai?"; options = ["Subject", "Verb", "Jo mubtada ke barey mein bataye", "Object"]; correctOption = 2 },
          { id = 9; questionText = "'Waqt' (time) batane wale alfaz ko kya kahte hain?"; options = ["Isam", "Zarf e zaman", "Sifat", "Fael"]; correctOption = 1 },
          { id = 10; questionText = "Tazkeer aur taneeth kya hain?"; options = ["Plural and singular", "Masculine and Feminine", "Tense forms", "None"]; correctOption = 1 }
        ];
      });

      quizzes.add(32, {
        id = 32; subjectId = 7; name = "Urdu Adab (Literature)";
        questions = [
          { id = 1; questionText = "Mirza Ghalib ka asli naam?"; options = ["Mirza Asadullah Khan", "Mirza Mehdi", "Mirza Ali", "Mirza Ibrahim"]; correctOption = 0 },
          { id = 2; questionText = "Allama Iqbal ka mashoor amal?"; options = ["Shikwa", "Dua", "Jawab e Shikwa", "A aur C dono"]; correctOption = 3 },
          { id = 3; questionText = "'Bang-e-Dara' kis ki kitab hai?"; options = ["Ghalib", "Mir Taqi Mir", "Allama Iqbal", "Faiz Ahmed Faiz"]; correctOption = 2 },
          { id = 4; questionText = "Faiz Ahmed Faiz ka ek mashhoor shair?"; options = ["Hum Dekhenge", "Lab pe aati hai dua", "Khudi ko kar", "Sare jahan se acha"]; correctOption = 0 },
          { id = 5; questionText = "Urdu novel ka bani (father) kise mana jata hai?"; options = ["Ghalib", "Mir Taqi Mir", "Deputy Nazir Ahmad", "Iqbal"]; correctOption = 2 },
          { id = 6; questionText = "Mir Taqi Mir ka taalluq kis sheher se tha?"; options = ["Lahore", "Agra aur Delhi", "Karachi", "Hyderabad"]; correctOption = 1 },
          { id = 7; questionText = "'Umrao Jaan Ada' kisne likhi?"; options = ["Ghalib", "Mirza Hadi Ruswa", "Nazir Ahmad", "Iqbal"]; correctOption = 1 },
          { id = 8; questionText = "Iqbal ka pehla shair kis zaban mein tha?"; options = ["Urdu", "Farsi", "Arabi", "Punjabi"]; correctOption = 0 },
          { id = 9; questionText = "Manto ka full naam?"; options = ["Saadat Hasan Manto", "Mohammad Hasan Manto", "Abdul Hasan Manto", "None"]; correctOption = 0 },
          { id = 10; questionText = "'Aangan' novel kisne likhi?"; options = ["Bano Qudsia", "Khadija Mastoor", "Ismat Chughtai", "Parveen Shakir"]; correctOption = 1 }
        ];
      });

      quizzes.add(33, {
        id = 33; subjectId = 7; name = "Urdu Imlaa aur Alfaz";
        questions = [
          { id = 1; questionText = "'Khushboo' ka matlab?"; options = ["Buri boo", "Acha khana", "Meethi mehak", "Paani"]; correctOption = 2 },
          { id = 2; questionText = "'Aman' ka ulta?"; options = ["Khushi", "Jang ya fasad", "Mohabbat", "Dukh"]; correctOption = 1 },
          { id = 3; questionText = "'Roshni' ka matlab?"; options = ["Andhera", "Tezi", "Ujala", "Khaamoshi"]; correctOption = 2 },
          { id = 4; questionText = "'Mehnat' ka matlab?"; options = ["Aaram", "Koshish aur kaam", "Neend", "Khel"]; correctOption = 1 },
          { id = 5; questionText = "'Intizar' ka matlab?"; options = ["Khushboo", "Milap", "Raah dekhna", "Chalte rehna"]; correctOption = 2 },
          { id = 6; questionText = "'Khauf' ka ulta?"; options = ["Dard", "Himmat aur jurrat", "Gham", "Shararat"]; correctOption = 1 },
          { id = 7; questionText = "'Shajarat' ka matlab?"; options = ["Bahr", "Jang", "Darakhton ka khazana", "Pahad"]; correctOption = 2 },
          { id = 8; questionText = "'Adab' ka matlab?"; options = ["Ghussa", "Bohtan", "Ihtiraam aur tameez", "Dar"]; correctOption = 2 },
          { id = 9; questionText = "'Mohabbat' ka arabi lafz?"; options = ["Hubb", "Ishq", "A aur B dono", "Kuch nahi"]; correctOption = 2 },
          { id = 10; questionText = "'Zindagi' ka matlab?"; options = ["Maut", "Neend", "Life/Hayat", "Khwaab"]; correctOption = 2 }
        ];
      });

      quizzes.add(34, {
        id = 34; subjectId = 7; name = "Urdu Shayari";
        questions = [
          { id = 1; questionText = "Ghazal mein dohe ko kya kahte hain?"; options = ["Misra", "Sher", "Radif", "Qafiya"]; correctOption = 1 },
          { id = 2; questionText = "Ghazal ke pehle sher ko kya kahte hain?"; options = ["Maqta", "Matlaa", "Husn-e-Matlaa", "Radif"]; correctOption = 1 },
          { id = 3; questionText = "Ghazal ke aakhri sher mein shair ka naam hota hai use kya kahte hain?"; options = ["Matlaa", "Radif", "Maqta", "Qafiya"]; correctOption = 2 },
          { id = 4; questionText = "'Qafiya' kya hota hai?"; options = ["Sher ki pehli line", "Rhyming words in ghazal", "Shair ka naam", "Topic"]; correctOption = 1 },
          { id = 5; questionText = "Marsiya kiski yaad mein likhi jaati hai?"; options = ["Khushi ke liye", "Hazrat Imam Hussain (RA) ki shahadat", "Eid ke liye", "Shadi ke liye"]; correctOption = 1 },
          { id = 6; questionText = "Nazm aur ghazal mein farq?"; options = ["Koi farq nahi", "Ghazal ke sher mustaqil, nazm ka mauzu ek", "Dono ek hain", "None"]; correctOption = 1 },
          { id = 7; questionText = "'Rubai' mein kitne misre hote hain?"; options = ["2", "3", "4", "5"]; correctOption = 2 },
          { id = 8; questionText = "Iqbal ki mashoor nazm 'Lab pe Aati Hai Dua' kahan se hai?"; options = ["Bang-e-Dara", "Bal-e-Jibril", "Zarb-e-Kalim", "Armaghan-e-Hijaz"]; correctOption = 0 },
          { id = 9; questionText = "Hamd kya hoti hai?"; options = ["Nabi ki taarif", "Allah ki taarif", "Buzurgon ki taarif", "Heroic poetry"]; correctOption = 1 },
          { id = 10; questionText = "Naat kise kahte hain?"; options = ["Allah ki hamd", "Nabi PAK ki taarif mein shayari", "Historical poetry", "Love poetry"]; correctOption = 1 }
        ];
      });

      quizzes.add(35, {
        id = 35; subjectId = 7; name = "Urdu Comprehension";
        questions = [
          { id = 1; questionText = "Ibarat ka khulasa kise kahte hain?"; options = ["Tarjuma", "Tashreeh", "Summary/Khulaasa", "Afsana"]; correctOption = 2 },
          { id = 2; questionText = "Mazmoon (essay) ke teen hisse kaun se hain?"; options = ["Aghaz, Darmiyaan, Anjaam", "Sher, Shair, Kitab", "Noun, Verb, Adjective", "None"]; correctOption = 0 },
          { id = 3; questionText = "Kahani aur afsane mein kya farq hai?"; options = ["Koi farq nahi", "Kahani chhoti, Afsana mein kirdaar gehre", "Afsana chhota", "Dono same hain"]; correctOption = 1 },
          { id = 4; questionText = "Tashrih kya hoti hai?"; options = ["Translation", "Explanation of text", "Summary", "Criticism"]; correctOption = 1 },
          { id = 5; questionText = "Maktob (letter) mein konsa hissa zaroori hai?"; options = ["Sarf o Nahw", "Date, Receiver, Sender", "Shayari", "Drawing"]; correctOption = 1 },
          { id = 6; questionText = "Urdu mein Roman script ka istimaal kab badhaa?"; options = ["1947 ke baad", "Internet aur mobile ke aane ke baad", "Mughal dor mein", "British dor mein"]; correctOption = 1 },
          { id = 7; questionText = "Urdu ka pehla akhbar kaun sa tha?"; options = ["Jang", "Dawn", "Jam-e-Jahan Numa", "Nawa-e-Waqt"]; correctOption = 2 },
          { id = 8; questionText = "Tahqeeq (research) ke liye zaroori cheez?"; options = ["Sirf opinion", "Evidence aur proof", "Kahaniyan", "Sher"]; correctOption = 1 },
          { id = 9; questionText = "'Ibarat' ka matlab?"; options = ["Ek lafz", "Text ya passage", "Sher", "Drawing"]; correctOption = 1 },
          { id = 10; questionText = "Umda (good) writing ki pehchan?"; options = ["Lambi ho", "Waضح, mukhtasar aur dil nasheen", "Mushkil alfaz wali", "None"]; correctOption = 1 }
        ];
      });
    };
  };

  system func preupgrade() {};
  system func postupgrade() {};
};
